const jwt = require("jsonwebtoken")

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

module.exports = {
    login,
    profile
}