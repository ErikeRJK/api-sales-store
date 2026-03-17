const jwt = require("jsonwebtoken");
const { Users } = require("../models");

function authToken() {
    return async (req, res, next) => {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).send({
                error: "Token não encontrado!"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const user = await Users.findByPk(decoded.id)

            if(!user){
                return res.status(401).send({
                    error: "Usuário não encontrado!"
                })
            }

            if(!user.active){
                return res.status(401).send({
                    error: "Usuário inativo!"
                })
            }

            req.user = user;

            next()
        } catch (error) {
            return res.status(401).send({
                error: "Token inválido!"
            })
        }
    }
}

module.exports = {
    authToken
}