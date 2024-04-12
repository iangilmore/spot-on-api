import './config/database.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './docs/swagger-output.json' assert {type: 'json'}

import usersRouter from './routes/usersRouter.js'
import puzzlesRouter from './routes/puzzlesRouter.js'
import puzzleCardsRouter from './routes/puzzleCardsRouter.js'
import resultsRouter from './routes/resultsRouter.js'

let app
async function localhostOrNot() {
  if (process.env.USE_HTTPS_LOCALHOST) {
    let httpsLocalHost = await import('https-localhost')
    app = httpsLocalHost.default()
    allTheThings()
  } else {
    app = express()
    allTheThings()
  }
}

localhostOrNot()

function allTheThings() {
  mongoose.set('debug', process.env.MONGOOSE_DEBUG)
  app.listen(process.env.PORT, () => {
    console.log(`Express server is running`)
  })
  
  app.use(express.json())
  app.use(cors({
    credentials: true, 
    origin: 'https://spot-on.webdevstuff.ninja'
  }))
  app.use(cookieParser())

  app.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  
  app.use('/user', usersRouter)
  app.use('/puzzles', puzzlesRouter)
  app.use('/puzzleCards', puzzleCardsRouter)
  app.use('/results', resultsRouter)
  app.use('/', async (req, res) => {
    res.json({'message': 'Welcome to the Spot On API'})
  })  
}