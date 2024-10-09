import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import jobModel from './models/jobModel.js'
import UserModel from './models/UserModel.js'

try {
  await mongoose.connect(process.env.MONGO_URL)
  const user = await UserModel.findOne({ email: 'zilka.tomas421@gmail.com' })
  const jsonJobs = JSON.parse(await readFile(new URL('./utils/mockData.json', import.meta.url)))
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })
  await jobModel.deleteMany({ createdBy: user._id })
  await jobModel.create(jobs)
  console.log('Success')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
