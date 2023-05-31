const User = require("../models/user.model");
const { envioEmail } = require('../services/emailservice');

//Async e Await

//  Método  Criar um novo User:

exports.registerNewUser = async (req, res) => {
  try {
    // => Antes vamos fazer uma verificação se o usuário já possui algum e-mail já cadastrado:
    const isUser = await User.find({ email: req.body.email });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res
        .status(409)
        .json({ message: "Atenção! Este e-mail já possui registro!" });
    }

    const newUser = new User(req.body);
    const user = await newUser.save();

    const token = await newUser.generateAuthToken(); // ==> Aqui chamaremos o método que criamos no model
    return res
      .status(201)
      .json({ message: "Usuário(a) criado(a) com sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err, dale });
  }
};

// ==> Método responsável por realizar um novo login 'User':
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        error: "Erro ao Logar! Verifique as suas credenciais de autenticação!",
      });
    }
    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000).toString();
    user.codigoVerificacao = codigoVerificacao;
    await user.save();

    // Enviar o código de verificação por e-mail
    await envioEmail(user.email, 'Código de verificação', `Seu código de verificação é: ${codigoVerificacao}`);

    const token = await user.generateAuthToken();
    return res
      .status(201)
      .json({ message: "Usuário(a) logado com sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// ==> Método responsável por retornar um determinado 'User'
exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};