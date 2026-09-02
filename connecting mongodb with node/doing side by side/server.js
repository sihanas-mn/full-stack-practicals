import express from 'express'
import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5001
const url = process.env.MONGO_URI || 'mongodb://localhost:27017'
const dbName = process.env.DB_NAME || 'brand_new_db'

const client = new MongoClient(url)
const db = await 