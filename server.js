import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'

import db from './config/connection.js'
dotenv.config()

const app = express()
app.use(cors())

const port = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(routes)

db.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`App listening on port ${port}!`))
})
