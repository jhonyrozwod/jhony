 
const User = require("../models/user.model");
const { envioEmail } = require('../services/emailservice');

//Async e Await

// Método responsável por verificar o código de verificação

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
    return res.status(400).json({ err });
  }
};

// ==> Método responsável por realizar um novo login 'User':
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(301).json({
        error: "Erro ao Logar! Verifique as suas credenciais de autenticação!",
      });
    }
    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000).toString();
    user.codigoVerificacao = codigoVerificacao;
    await user.save();

    var teste = await envioEmail(user.email, user.codigoVerificacao, `Seu código de verificação é: ${codigoVerificacao}`);
    if(teste == "SUCCESS"){
      console.log('Deu boa o envio');
      const token = await user.generateAuthToken();

      return res
      .status(201)
      .json({ message: "Usuário(a) logado com sucesso!", user, token });

    } else {
      return res
      .status(503)
      .json({ message: "Falha ao se comunicar com o servidor, tente novamente em instantes...", user, token });
    }

  } catch (err) {

    return res.status(400).json({ err });

  }
};

// ==> Método responsável por retornar um determinado 'User'
exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};