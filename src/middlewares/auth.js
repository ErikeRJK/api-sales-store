const { Users } = require("../models");
const bcrypt = require("bcrypt");

async function validateLogin(req, res, next){
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).send({
            error: "Email e senha são obrigátorios"
        })
    }

    try {
        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        if(!user){
            return res.status(404).send({
                error: "Usuário não encontrado"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword){
            return res.status(400).send({
                error: "Senha inválida !"
            })
        }

        req.user = user;

        next();
        
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    validateLogin
}