const axios = require("axios")

const emailApi = axios.create({
    baseURL: process.env.EMAIL_API_URL,
    headers: {
        "secret-key": process.env.EMAIL_API_SECRET_KEY
    }
})

module.exports = emailApi