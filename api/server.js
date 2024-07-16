import express from 'express'
import users from './routes/users.routes.js'
import clients from './routes/clients.routes.js'
import relations from './routes/users_clients.routes.js'
import accounts from './routes/acounts.routes.js'
import payments from './routes/payments.routes.js'
import periods from './routes/collection_period.routes.js'

const app = express()
app.use(express.json())

app.use('/api/users', users)
app.use('/api/clients', clients)
app.use('/api/relations', relations)
app.use('/api/credits', accounts)
app.use('/api/periods', periods)
app.use('/api/payments', payments)


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000)