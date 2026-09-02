import express from 'express'
import dotenv from 'dotenv'



const app = express()

const PORT = 5001

app.listen(PORT, () => {
    console.log(`server is now working on https://localhost:${PORT}`)
})