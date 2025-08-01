const participantController = require('../src/controllers/participantController');
const Participant = require('../src/models/Participant'); 

// Mocka (simula) o modelo Participant do Mongoose
// Isso impede que o teste tente se conectar a um banco de dados real
jest.mock('../src/models/Participant', () => {
  const mockParticipant = jest.fn().mockImplementation((data) => {
    const plainData = {
      _id: 'mockId' + Date.now(), // Gera um ID mockado
      firstName: data.firstName,
      lastName: data.lastName,
      participation: data.participation,
    };

    const instance = { ...plainData }; 

    // Define os métodos 'save', 'toObject' e 'toJSON' como propriedades não enumeráveis
    // Isso garante que eles existam na instância para serem chamados, mas não sejam serializados para JSON
    Object.defineProperty(instance, 'save', {
      value: jest.fn().mockResolvedValue(plainData), // 'save' resolve com o objeto de dados puro
      writable: true,
      configurable: true,
      enumerable: false, // IMPORTANTE: Não enumerável para não ser serializado
    });

    Object.defineProperty(instance, 'toObject', {
      value: jest.fn(() => plainData), // 'toObject' retorna o objeto de dados puro
      writable: true,
      configurable: true,
      enumerable: false, // IMPORTANTE: Não enumerável
    });

    Object.defineProperty(instance, 'toJSON', { // Mongoose também pode usar toJSON
      value: jest.fn(() => plainData), // 'toJSON' retorna o objeto de dados puro
      writable: true,
      configurable: true,
      enumerable: false, 
    });

    return instance;
  });

  // Simula o método find() do Participant
  // Ele deve retornar uma Promise que resolve diretamente para o array de participantes,
  // pois o controlador usa `await Participant.find();`
  mockParticipant.find = jest.fn().mockResolvedValue([
    { firstName: 'João', lastName: 'Silva', participation: 20 },
    { firstName: 'Maria', lastName: 'Souza', participation: 30 },
  ]);

  // Simula o método findByIdAndDelete()
  mockParticipant.findByIdAndDelete = jest.fn().mockResolvedValue({
    _id: 'mockDeleteId',
    firstName: 'Deletado',
    lastName: 'Teste',
    participation: 10,
  });

  // Retorna o mock do construtor como o default export
  return mockParticipant;
});


describe('participantController', () => {
  // Limpa os mocks antes de cada teste para garantir que os testes sejam independentes
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste para a função getAllParticipants
  test('getAllParticipants deve retornar todos os participantes e a soma total', async () => {
    // Simula os objetos de requisição e resposta do Express
    const req = {}; // Requisição vazia para GET
    const res = {
      status: jest.fn().mockReturnThis(), // Mocka o método status para permitir encadeamento
      json: jest.fn(), // Mocka o método json para capturar a resposta
    };

    // Chama a função do controlador
    await participantController.getAllParticipants(req, res);

    // Verifica se Participant.find() foi chamado
    expect(Participant.find).toHaveBeenCalledTimes(1);

    // Verifica se a resposta HTTP foi 200 OK
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifica se a resposta JSON contém os dados esperados
    expect(res.json).toHaveBeenCalledWith({
      participants: [
        { firstName: 'João', lastName: 'Silva', participation: 20 },
        { firstName: 'Maria', lastName: 'Souza', participation: 30 },
      ],
      totalParticipation: 50, // 20 + 30 = 50
    });
  });

  // Teste para a função createParticipant
  test('createParticipant deve criar um novo participante e retornar 201', async () => {
    // Dados de teste para a requisição
    const req = {
      body: {
        firstName: 'Novo',
        lastName: 'Participante',
        participation: 10,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Chama a função do controlador
    await participantController.createParticipant(req, res);

    // Verifica se o construtor do Participant foi chamado com os dados corretos
    expect(Participant).toHaveBeenCalledWith({ 
      firstName: 'Novo',
      lastName: 'Participante',
      participation: 10,
    });

    // Verifica se o método save() da instância do participante foi chamado
    // Acessa a instância mockada que foi criada pelo construtor
    expect(Participant.mock.results[0].value.save).toHaveBeenCalledTimes(1); 

    // Verifica se a resposta HTTP foi 201 Created
    expect(res.status).toHaveBeenCalledWith(201);

    // Verifica se a resposta JSON contém os dados do novo participante
    // O mockResolvedValue do save() agora retorna um objeto limpo, que é o que esperamos aqui
    expect(res.json).toHaveBeenCalledWith({
      _id: expect.any(String), // O ID é gerado dinamicamente no mock
      firstName: 'Novo',
      lastName: 'Participante',
      participation: 10,
    });
  });

  // Teste para createParticipant com dados inválidos (status 400)
  test('createParticipant deve retornar 400 se faltarem dados', async () => {
    const req = {
      body: {
        firstName: 'Teste',
        lastName: '', // simular dados inválidos
        participation: 50,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await participantController.createParticipant(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Todos os campos são obrigatórios e participação deve ser um número.',
    });
    // Garante que o construtor do Participant não foi chamado se a validação falhou
    expect(Participant).not.toHaveBeenCalled(); 
  });

  // Teste para deleteParticipant
  test('deleteParticipant deve deletar um participante e retornar 200', async () => {
    const req = { params: { id: 'someIdToDelete' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await participantController.deleteParticipant(req, res);

    expect(Participant.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(Participant.findByIdAndDelete).toHaveBeenCalledWith('someIdToDelete');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Participante excluído com sucesso.' });
  });

  // Teste para deleteParticipant com participante não encontrado (status 404)
  test('deleteParticipant deve retornar 404 se o participante não for encontrado', async () => {
    // Simula findByIdAndDelete retornando null (participante não encontrado)
    Participant.findByIdAndDelete.mockResolvedValueOnce(null); 

    const req = { params: { id: 'nonExistentId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await participantController.deleteParticipant(req, res);

    expect(Participant.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Participante não encontrado.' });
  });
});
