const CryptoJS = require("crypto-js");

async function encryptUserToken(userId){
    try {
        const encryptUserId = CryptoJS.AES.encrypt(
            userId,
            process.env.ENCRYPT_SECRET
        ).toString

        return encryptUserId
    } catch (error) {
        throw new Error(error)
    }


}

module.exports = {
    encryptUserToken
}