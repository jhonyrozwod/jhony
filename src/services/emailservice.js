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

  enviarEmail(destinatario, assunto, conteudo) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: this.userMail,
      to: destinatario,
      subject: assunto,
      text: conteudo + verificationCode
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Erro ao enviar e-mail:", error);
      } else {
        console.log("E-mail enviado com sucesso!");
      }
    });
  }

  gerarCodigoVerificacao() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

module.exports = new EnvioEmail();