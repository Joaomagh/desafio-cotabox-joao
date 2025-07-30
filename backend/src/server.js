// backend/src/server.js
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const app = require('./app'); // Importa o aplicativo Express configurado
const connectDB = require('./config/db'); // Importa a função de conexão com o banco de dados

const PORT = process.env.PORT || 5000; // Define a porta do servidor (usa a do .env ou 5000 como padrão)

// Conectar ao banco de dados
connectDB();

// Iniciar o servidor Express
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Mensagem no console indicando que o servidor iniciou
    console.log(`Acesse: http://localhost:${PORT}`); // Ajuda visual para acessar a API
});
