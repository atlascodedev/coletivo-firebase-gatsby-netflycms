const nodemailer = require("nodemailer")

let envTest = process.env.TEST_VARIABLE

exports.handler = async (event, context) => {
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

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }

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

  if (event.httpMethod !== "POST") {
    let response = {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method not allowed.",
      }),
    }

    return response
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
      return response
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      },
      body: JSON.stringify({
        message: "Formulário de contato enviado com sucesso!",
      }),
    }
  })
}
