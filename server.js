import './config/database.js'

import express from 'express'
import cors from 'cors'
// import httpsLocalHost from 'https-localhost'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/usersRouter.js'

let app
async () => {
  if (process.env.USE_HTTPS_LOCALHOST) {
    const httpsLocalHost = await import('https-localhost');
    app = httpsLocalHost()
    allTheThings()
  } else {
    app = express()
    allTheThings()
  }
}

function allTheThings() {
  app.listen(443, () => {
    console.log(`Express server is running`);
  })
  
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  
  app.use('/user', usersRouter)
  app.use('/', async (req, res) => {
    res.send('<h1>Spot On API</h1>')
  })
}