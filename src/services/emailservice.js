const nodemailer = require('nodemailer');

class EnvioEmail {

  envioEmail(email, codigoVerificacao, menssage) {

    var transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      auth: {
        user: "jhonyrozwod@outlook.com",
        pass: "Vaisefoder46@"
      }
    });

    const mailOptions = {
      from: "jhonyrozwod@outlook.com",
      to: email,
      subject: menssage,
      text: codigoVerificacao
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Erro: Deu Ruim", error);
          reject(error);
        } else {
          console.log("Resposta: Deu bom", info);
          resolve(info);
        }
      });
    });
  }
}

module.exports = new EnvioEmail();