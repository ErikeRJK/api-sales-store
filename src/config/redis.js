const { createClient } = require("redis");

const redisCliente = createClient({
    url: process.env.REDIS_URL
})

redisCliente.on("error", (err) =>{
    console.error(`Erro ao conectar-se ao Redis: ${err}`)
})

redisCliente.connect()
    .then(() => console.log("Redis conectado com sucesso!"))
    .catch(console.error)

module.exports = redisCliente