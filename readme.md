# Desafio Fullstack Cotabox

## Visão Geral do Projeto
Este projeto é uma solução fullstack desenvolvida como parte de um desafio técnico para a Cotabox. criação de APIs robustas no back-end e interfaces de usuário responsivas no front-end, seguindo boas práticas de organização e estilo de código.

Este desafio foi particularmente enriquecedor, pois me permitiu aplicar e aprofundar conhecimentos em áreas que estava começando a estudar e tenho interesse, como Docker e Testes Unitários. Foi uma experiência desafiadora e gratificante. Infelizmente não consegui fazer o deploy completo mas o saldo é super posítivo. 

A aplicação permite o gerenciamento de participantes e suas respectivas porcentagens de participação, apresentando os dados em uma tabela e um gráfico de distribuição.

---

## Tecnologias Utilizadas

### Front-end
- **Vue.js 3** 
- **Vuetify 3**
- **Axios**
- **Chart.js** 

### Back-end
- **Node.js** 
- **Express.js** — Framework web para construção de APIs RESTful.
- **Mongoose** — ODM para interação com MongoDB.
- **MongoDB** — Banco de dados NoSQL.
- **Dotenv** — Gerenciador de variáveis de ambiente.


### Outros
- **Docker** — Containerização de ambientes.
- **Docker Compose** — Orquestra multi-container.
- **Jest** — Testes unitários no back-end.

---

## Funcionalidades Implementadas

### Gerenciamento de Participantes
- **Adicionar Participante**: Nome, Sobrenome e Percentual de Participação.
- **Excluir Participante**: Através de botão na tabela.

### Validação de Dados
- Todos os campos são obrigatórios.
- Campos de nome não aceitam números.
- Participação aceita valores entre 0 e 100.
- Soma das participações não pode ultrapassar 100%.
- A API retorna `400 Bad Request` para entradas inválidas.

### Visualização de Dados
- Tabela dinâmica com dados dos participantes.
- Gráfico de pizza exibindo a distribuição percentual.
- Mensagens de status com base na soma total da participação.

### Interface de Usuário
- Layout totalmente responsivo com Vuetify.
- Design limpo com cards e snackbar para feedback.
- Diálogo de confirmação para exclusões.
- Logotipo da Cotabox no rodapé.

### Containerização com Docker
- MongoDB e back-end empacotados via Docker.
- Orquestração com Docker Compose.

### Testes Unitários
- Testes com Jest para os controllers do back-end.

---

## Requisitos do Sistema
- Node.js (18.x ou superior)
- npm ou Yarn
- Docker Desktop (Windows/macOS) ou Docker Engine + Docker Compose (Linux)

**Importante:**
- Ative o suporte à virtualização na BIOS.
- No Windows, certifique-se que o WSL 2 está instalado e atualizado (`wsl --update`).

---

##  Como Rodar a Aplicação Localmente

### 1. Clone o Repositório
```bash
git clone https://github.com/Joaomagh/desafio-cotabox-joao
cd backend ou frontend
```

### 2. Iniciar o Back-end e o MongoDB com Docker
Certifique-se de que o Docker esteja rodando.  
Abra o terminal na raiz do projeto (onde está o `docker-compose.yml`).

```bash
docker-compose up --build
```

Aguarde até ver no terminal:
- Servidor rodando na porta 5000
- MongoDB conectado com sucesso!

### 3. Rodar o Front-end
Em outro terminal:

```bash
cd frontend
npm install        # ou yarn install
npm run serve      # ou yarn serve
```

Acesse no navegador: [http://localhost:8080](http://localhost:8080)

---
##  Rodar os Testes Unitários (Back-end)
```bash
cd backend
npm test
```

Os testes serão executados com Jest, validando a lógica de negócio.

---

## Aplicação
A aplicação estará rodando com:
- **Back-end (containerizado)** em `http://localhost:5000`
- **MongoDB** em `http://localhost:27017`
- **Front-end** em `http://localhost:8080`

---

**João Pedro Rego Magalhães**

https://www.linkedin.com/in/joaomagh/
