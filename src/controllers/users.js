const {Users} = require("../models")
const emailApi = require("../services/emailApi")

async function createUser(req, res){
        try {
        await Users.create(req.body)

        await emailApi.post("/email/send", {
            to: req.body.email,
            toName: req.body.name,
            subject: "Bem vindo ao nosso sistema",
            html: "<p> Seja bem vindo <p>"
        })

        return res.status(201).send({
            message: "Usuário criado com sucesso !"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    createUser
}