const mongoose = require('mongoose');
const logger = require('../logger/index.js');

// ==> Importar o arquivo: 'db.config.js'
const database = require('./db.config'); // ==> aqui é conexão local: MongoDB

mongoose.Promise = global.Promise;

// ==> Conexão Base de Dados:
mongoose.connect(database.local.localUrlDatabse, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  logger.info('A Base de Dados foi conectada com sucesso!');
}, (err) => {
  logger.error();(`Erro ao conectar com a Base de Dados...: ${err}`);
  process.exit();
});