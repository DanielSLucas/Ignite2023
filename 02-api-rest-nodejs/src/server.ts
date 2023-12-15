import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const PORT = env.APP_PORT

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${PORT}`)
  })
