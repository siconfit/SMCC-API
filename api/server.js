import express from 'express'
import users from './routes/users.routes.js'
import clients from './routes/clients.routes.js'

const app = express()

app.use(users)
app.use(clients)

app.listen(3000)