require('dotenv').config()
require('./src/models/rel') // Define associations
const app = require('./src/server/app')
const conn = require('./src/db/conn')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0' // 0.0.0.0 é seguro e aceita conexões em PaaS

const isProduction = process.env.NODE_ENV === 'production'

async function startServer() {
  try {
    // Temporarily sync in production to fix table issues
    await conn.sync({ alter: true })
    console.log('Banco sincronizado');

    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`)
    });
  } catch (err) {
    console.error('Erro ao conectar ao banco ou iniciar o servidor:', err)
    process.exit(1) // sai com erro para o Railway identificar falha no deploy
  }
}

startServer()
