import './config/database.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/usersRouter.js'
// import puzzlesRouter from './routes/puzzlesRouter.js'
// import puzzleCardsRouter from './routes/puzzleCardsRouter.js'
// import resultsRouter from './routes/resultsRouter.js'

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
  app.listen(process.env.PORT, () => {
    console.log(`Express server is running`);
  })
  
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  
  app.use('/user', usersRouter)
  // app.use('/puzzles', puzzlesRouter)
  // app.use('/puzzleCards', puzzleCardsRouter)
  // app.use('/results', resultsRouter)
  app.use('/', async (req, res) => {
    res.send('<h1>Spot On API</h1>')
  })  
}