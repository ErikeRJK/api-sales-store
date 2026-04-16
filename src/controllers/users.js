const { Users } = require("../models");
const { sendEmail } = require("../helpers/email-service");
const { templateEmail } = require("../templates/welcome-email");

async function createUser(req, res) {
  try {
    await Users.create(req.body);

    const template = await templateEmail(req.body.name, "https://youtube.com");

    await sendEmail(
      req.body.email,
      req.body.name,
      "Bem vindo ao nosso sistema",
      template
    );

    return res.status(201).send({
      message: "Usuário criado com sucesso !",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

module.exports = {
  createUser,
};
