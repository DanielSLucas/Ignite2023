import fastify from 'fastify'
import { knex } from './database'

const PORT = 3333

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
