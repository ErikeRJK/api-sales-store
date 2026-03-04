const { Users} = require("../models")
const bcrypt = require("bcrypt")

async function validateCreateUser(req, res, next){
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).send({
            message: "Todos os campos são obrigatórios"
        })
    }

    if (password.length < 8) {
        return res.status(400).send({
            message: "A senha deve ter no minimo de 8 caracteres"
        })
    }

    try {
        const existUser = await Users.findOne({
            where: {
                email: email
            }
        })

        if(existUser){
            return res.status(400).send({
                error: "Email já cadastrado !"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        req.body.password = hashedPassword
            
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

    next()
}

module.exports = {
    validateCreateUser
}