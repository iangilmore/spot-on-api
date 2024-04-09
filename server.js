import './config/database.js'

import express from 'express'
import cors from 'cors'
import httpsLocalHost from 'https-localhost'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/usersRouter.js'

let app
const useLocalHost = () => { app = httpsLocalHost() }
const useExpress = () => { app = express() }
process.env.USE_HTTPS_LOCALHOST ? useLocalHost() : useExpress()

app.listen(443, () => {
  console.log(`Express server is running`);
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/user', usersRouter)