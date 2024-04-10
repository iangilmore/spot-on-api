import './config/database.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/usersRouter.js'

let app
// import httpsLocalHost from 'https-localhost'
// app = httpsLocalHost()
app = express()

app.listen(process.env.PORT, () => {
  console.log(`Express server is running`);
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/user', usersRouter)
app.use('/', async (req, res) => {
  res.send('<h1>Spot On API</h1>')
})