const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on("error", (err) =>{
    console.error(`Erro ao conectar-se ao Redis: ${err}`)
})

redisClient.connect()
    .then(() => console.log("Redis conectado com sucesso!"))
    .catch(console.error)

module.exports = redisClient;
