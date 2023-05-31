const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongooseConnection = require('./config/mongooseConnection.config');



const app = express();

const index = require('./routes/index');
const userRoutes = require('./routes/user.routes');
const { text } = require('body-parser');



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));




// ==> Retornando a conexão via mongoose via external file usando 'app.set()'
app.set('mongoose connection', mongooseConnection);

app.use(index);
app.use('/api/v1/', userRoutes);

module.exports = app;
