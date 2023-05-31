const nodemailer = require('nodemailer');

class EnvioEmail {
  constructor() {
    this.userMail = "jhonyrozwod@outlook.com";
    this.passMail = "Vaisefoder46@";

    this.transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      auth: {
        user: this.userMail,
        pass: this.passMail
      }
    });
  }

  EnvioEmail(email, codigoVerificacao) {
    const mailOptions = {
      from: this.userMail,
      to: email,
      subject: "Seu Codigo de verificação",
      text: codigoVerificacao.toString()
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
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