import { app } from './app'
import { env } from './env'

const PORT = env.APP_PORT

app
  .listen({
    port: PORT,
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${PORT}`)
  })
