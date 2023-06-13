const pino = require('pino')
const pretty = require('pino-pretty')
const stream = pretty({
    levelFirst: true,
    colorize: true
})
const logger = pino({ level: 'debug' }, stream)


module.exports = logger 