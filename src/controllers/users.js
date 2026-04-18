const { Users } = require("../models");
const { sendEmail } = require("../helpers/email-service");
const { templateEmail } = require("../templates/welcome-email");
const { encryptUserToken } = require("../helpers/encrypt-user-token")
const  redisClient  = require("../config/redis")

async function createUser(req, res) {
  try {
    const user = await Users.create(req.body);

    const token = await encryptUserToken(user.id);

    await redisClient.set(
        `user:${user.id}`,
        token,
        {
            EX: 7 * 24 * 60 * 60
        }
    )

    const link = `${process.env.FRONTEND_URL}/active-user?token=${token}`

    const template = await templateEmail(req.body.name, link);

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
      error: error.message
    });
  }
}

module.exports = {
  createUser,
};
