const app = require('./src/app');
console.log(process.env.port);
const port = process.env.port || 3000;
const logger = require('./src/logger');

``

app.listen(port, () => {
logger.info('Aplicação executando na porta...: '+ port)
});
