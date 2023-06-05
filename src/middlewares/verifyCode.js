const User = require("../models/user.model");
exports.verifyCode = async (req, res) => {
    try {
      const { email, codigoVerificacao } = req.body;
      console.log(email);
      console.log(codigoVerificacao);
      // Verificar se o código de verificação é válido
      const user = await User.findOne({ email, codigoVerificacao });
      console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'Código de verificação inválido' });
      }
      
  
      // Limpar o código de verificação do usuário após a verificação
      //user.codigoVerificacao = null;
      //await user.save();
  
      return res.status(200).json({ message: 'Código de verificação válido' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao verificar código de verificação', err });
    }
  };