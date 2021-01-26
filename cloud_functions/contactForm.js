exports.handler = async (event, context, callback) => {
  const nodemailer = require("nodemailer")

  const formName = event.body.name
  const formMail = event.body.email
  const formMessage = event.body.message
  const formPhone = event.body.phone

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_APP_PASS,
    },
  })

  const mailOptions = {
    from: "Coletivo Pro Cidadania - Sistema <sistema@coletivoprocidadania.org>",
    to: "coletivocmslogin@gmail.com",
    subject: "Contato efetuado pelo seu website",
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
      callback(null, response)
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Formulário de contato enviado com sucesso!",
      }),
    }

    callback(null, response)
  })
}
