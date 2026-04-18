const jwt = require("jsonwebtoken")
const { decryptUserToken } = require("../helpers/encrypt-user-token")

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

    
}

module.exports = {
    login,
    profile
}