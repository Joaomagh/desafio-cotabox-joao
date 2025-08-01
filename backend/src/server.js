require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const app = require('./app'); // Importa a instância do aplicativo Express configurada
const connectDB = require('./config/db'); // Importa a função de conexão com o MongoDB

const PORT = process.env.PORT || 5000; 

connectDB();

// Inicia o servidor Express.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); 
  console.log(`Acesse: http://localhost:${PORT}`); 
});
