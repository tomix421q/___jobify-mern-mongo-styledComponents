import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import cloudinary from 'cloudinary'

//public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

//avatar save
// local
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/dist')))

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

//Routers
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// Env -> morgan
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

//global frontend load
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})
//Not found
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

//Midleware error
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100
//DB
try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
