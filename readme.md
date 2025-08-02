Desafio Fullstack Cotabox: Gerenciamento de Participantes
Visão Geral do Projeto
Este projeto é uma solução fullstack desenvolvida como parte de um desafio técnico para a Cotabox. O objetivo principal é demonstrar proficiência em desenvolvimento web, incluindo a criação de APIs robustas no back-end e interfaces de usuário responsivas no front-end, seguindo boas práticas de organização e estilo de código.

Este desafio foi particularmente enriquecedor, pois me permitiu aplicar e aprofundar conhecimentos em áreas que estava começando a estudar, como Docker e Testes Unitários. Foi uma experiência desafiadora e gratificante.

A aplicação permite o gerenciamento de participantes e suas respectivas porcentagens de participação, apresentando os dados em uma tabela e um gráfico de distribuição.

Tecnologias Utilizadas
Front-end:
Vue.js 3: Framework progressivo para construção de interfaces de usuário.

Vuetify 3: Framework de componentes UI para Vue.js, baseado no Material Design, utilizado para criar uma interface responsiva e visualmente atraente.

Axios: Cliente HTTP baseado em Promises para fazer requisições à API.

Vue Chart.js / Chart.js: Biblioteca para visualização de dados (gráfico de pizza).

Back-end:
Node.js: Ambiente de execução JavaScript no servidor.

Express.js: Framework web minimalista e flexível para construir APIs RESTful.

Mongoose: ODM (Object Data Modeling) para Node.js, facilitando a interação com o MongoDB.

MongoDB: Banco de dados NoSQL, utilizado para armazenar os dados dos participantes.

Dotenv: Para carregar variáveis de ambiente de um arquivo .env.

CORS: Middleware para habilitar o Compartilhamento de Recursos de Origem Cruzada.

Ferramentas e Outros:
Docker: Plataforma para desenvolver, enviar e executar aplicações em containers.

Docker Compose: Ferramenta para definir e rodar aplicações Docker multi-container.

Jest: Framework de teste JavaScript, utilizado para testes unitários no back-end.

ESLint: Ferramenta de linting para manter a qualidade e consistência do código.

Funcionalidades Implementadas
Gerenciamento de Participantes:

Adicionar Participante: Formulário para inserir "First Name", "Last Name" e "Participation (%)".

Excluir Participante: Botão com ícone de lixeira na tabela para remover participantes.

Validação de Dados:

Todos os campos são obrigatórios.

Campos "First Name" e "Last Name" não aceitam números.

Campo "Participation (%)" aceita apenas números entre 0 e 100.

Validação da soma total das participações, alertando se exceder 100%.

A API retorna erros 400 Bad Request para validações de entrada.

Visualização de Dados:

Tabela dinâmica exibindo os dados dos participantes com porcentagem formatada.

Gráfico de Pizza (Doughnut Chart) mostrando a distribuição visual das participações.

Mensagens de status para a soma das participações (abaixo, igual ou acima de 100%).

Interface de Usuário (UI):

Layout totalmente responsivo com Vuetify, adaptando-se a diferentes tamanhos de tela.

Design limpo com cards e efeito flutuante.

Snackbar para feedback de ações (sucesso, erro, aviso).

Diálogo de confirmação para exclusão de participantes.

Logotipo da Cotabox no rodapé.

Containerização com Docker:

O back-end e o MongoDB são empacotados e orquestrados usando Docker e Docker Compose, simplificando a configuração e execução do ambiente de desenvolvimento.

Testes Unitários:

Testes unitários para as funções do controlador do back-end (participantController.js) utilizando Jest, garantindo a lógica de negócio da API.

Requisitos do Sistema
Para rodar a aplicação localmente, você precisará ter instalado:

Node.js (versão 18.x ou superior recomendada)

npm (geralmente vem com o Node.js) ou Yarn

Docker Desktop (para Windows/macOS) ou Docker Engine e Docker Compose (para Linux)

Certifique-se de que o suporte à virtualização (VT-x / AMD-V) está ativado na BIOS/UEFI do seu computador.

No Windows, certifique-se de que o WSL 2 e os componentes de virtualização estão instalados e atualizados (wsl --update).


Como Rodar a Aplicação Localmente
Siga estes passos para configurar e executar a aplicação na sua máquina:

Clone o Repositório:

git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DA_PASTA_DO_SEU_PROJETO]


Configurar o Banco de Dados (MongoDB Local com Docker Compose):

Certifique-se de que o Docker Desktop (ou Docker Engine) está rodando.

Abra o terminal na raiz do projeto (onde está o docker-compose.yml).

Inicie o back-end e o MongoDB usando Docker Compose:

docker-compose up --build


Aguarde até ver as mensagens Servidor rodando na porta 5000 e MongoDB conectado com sucesso! nos logs do terminal. O MongoDB estará acessível internamente na rede Docker e externamente em http://localhost:27017.

Configurar e Rodar o Front-end:

Abra um novo terminal separado.

Navegue até a pasta frontend:

cd frontend


Instale as dependências do front-end:

npm install # ou yarn install


Inicie o servidor de desenvolvimento do Vue.js:

npm run serve


O terminal indicará o endereço local do front-end (geralmente http://localhost:8080/).

Acessar a Aplicação:

Abra seu navegador e acesse a URL do front-end: http://localhost:8080/.

A aplicação deverá carregar e se comunicar com o back-end rodando via Docker.

Como Rodar os Testes Unitários (Back-end)
Para executar os testes unitários do back-end:

Abra o terminal na pasta backend:

cd backend


Execute os testes com Jest:

npm test


Você verá o resultado dos testes, indicando se passaram ou falharam.