import express from 'express'
import { router } from './routes.js'
import { errorHandler } from './practice/26March.js'
import { getEnvVar } from './utils/getEnvVar.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
export const startServer = () =>{ 
const app = express()
app.use(express.json())
const port = Number(getEnvVar("PORT", '8811'))
app.use(cors())
app.use(cookieParser())

app.get('/', (req,res) => {
    res.send('hello world')
})

app.use(router)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
}
