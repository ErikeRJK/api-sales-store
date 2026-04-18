const CryptoJS = require("crypto-js");
const { text } = require("express");

async function encryptUserToken(userId){
    try {
        const encryptUserId = CryptoJS.AES.encrypt(
            userId,
            process.env.ENCRYPT_SECRET
        ).toString()

        return encryptUserId
    } catch (error) {
        throw new Error(error)
    }


}

async function decryptUserToken(token){
    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.ENCRYPT_SECRET)

        const text = bytes.toString(CryptoJS.enc.Utf8)

        return text
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    encryptUserToken,
    decryptUserToken
}