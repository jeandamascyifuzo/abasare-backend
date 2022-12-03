import 'dotenv/config'
import mongoose from 'mongoose'

const uri =
  process.env.MONGO_DEV_DB

export const connect = async ()=> {
    try {
    //MONGODB CONNECTION
        await mongoose.connect(uri)
    } catch (error) {
        console.log(`Database connection error: ${error}`)
        process.exit(1)
    }
}
