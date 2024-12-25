import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import "dotenv/config";
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Middleware

app.use(cors({
    credentials: true,
    origin:'*' // replace with your domain
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

console.log("JWT_SECRET:", process.env.JWT_SECRET);


// Routes
app.get('/', (req, res) => res.send('Hello World!'))

import authRouter from './routes/auth.route.js';
app.use('/api/auth', authRouter);


// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    console.log(err.errors)
    const errMsg = err.message || "Something went wrong"
    res.status(500).json({
        message: errMsg,
        error : err.errors || []
    })
})



export default app;