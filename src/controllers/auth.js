const jwt = require("jsonwebtoken")
const { decryptUserToken } = require("../helpers/encrypt-user-token")
const  redisClient  = require("../config/redis")
const { Users } = require("../models/users")
const { where } = require("sequelize")

async function login(req, res){
    try {
        
        const user = req.user

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "30d"}

        )

        return res.send({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

async function profile(req, res) {
    const user = req.user;

    try {
        return res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

async function activeUser(req, res){
    const {token} = req.body;

    const cleanedToken = token.replace(/ /g, "+")

    const userId = decryptUserToken(cleanedToken)

    if(!userId){
        return send.status(400).send({
            error: "Token inválido"
        })
    }

    try {
        const redisToken = await redisClient.get(`user:${userId}`)

        if(!redisToken || redisToken !== cleanedToken){
            return res.status(400).send({
                error: "Token inválido!"
            })
        }

        await Users.update({active: true}, {where: {id: userId}})

        await redisClient.del(`user:${userId}`);

        return res.send({
            message: "Usuário ativado com sucesso !"
        })
    } catch (error) {
        return res.status(500).send({
            error: "Erro ao ativar usuário!"
        })
    }

    
}

module.exports = {
    login,
    profile
}