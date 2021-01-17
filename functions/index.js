const functions = require("firebase-functions")
const nodemailer = require("nodemailer")
const app = require("express")()
const cors = require("cors")

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.password,
  },
})

app.options("*", cors())

app.post("/sendMail", cors(), function (req, res, next) {
  const formName = req.body.name
  const formMail = req.body.email
  const formMessage = req.body.message
  const formPhone = req.body.phone

  const mailOptions = {
    from: "Coletivo Pro Cidadania - Sistema <coletivocmslogin@gmail.com>",
    to: "coletivocmslogin@gmail.com",
    subject: "Contato efetuado através do seu website",
    html: `
          <div style="display: flex, flex-direction: column, align-items: center">
          <h1> Um usuário enviou uma mensagem </h1>
            <h2> Nome do usuário : ${formName} </h2>
            <h2> E-mail do usuário: ${formMail} </h2>
            <h2> Telefone do usuário: ${formPhone} </h2>
            </hr>
            <h2> Mensagem do usuário: ${formMessage} </h2>
          </div>`,
  }

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error)
    } else {
      res.send("Email enviado")
    }
  })
})

exports.api = functions.https.onRequest(app)
