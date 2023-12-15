import fastify from 'fastify'

const PORT = 3333

const app = fastify()

app.get('/hello', () => {
  return 'Hello world'
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${PORT}`)
  })
