const User = require("../models/user.model");
const { enviarEmail } = require('../services/emailservice.js');

// Método Criar um novo User:
exports.registerNewUser = async (req, res) => {
  try {
    // Verificação se o usuário já possui um e-mail cadastrado
    const isUser = await User.find({ email: req.body.email });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res
        .status(409)
        .json({ message: "Atenção! Este e-mail já possui registro!" });
    }

    const newUser = new User(req.body);

    // Gerar um novo código de verificação
    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000).toString();

    newUser.codigoVerificacao = codigoVerificacao;

    const user = await newUser.save();

    // Enviar o código de verificação por e-mail
    await enviarEmail(newUser.email, 'Código de verificação', `Seu código de verificação é: ${codigoVerificacao}`);

    const token = await newUser.generateAuthToken();

    return res
      .status(201)
      .json({ message: "Usuário(a) criado(a) com sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// Método responsável por realizar um novo login 'User':
exports.loginUser = async (req, res) => {
  try {
    const { email, codigoVerificacao } = req.body;
    const user = await User.findOne({ email, codigoVerificacao });

    if (!user) {
      return res.status(401).json({
        error: "Erro ao Logar! Verifique as suas credenciais de autenticação!",
      });
    }

    const token = await user.generateAuthToken();
    return res
      .status(201)
      .json({ message: "Usuário(a) logado com sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// Método responsável por retornar um determinado 'User'
exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};