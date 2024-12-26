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
    origin:process.env.CORS // replace with your domain
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => res.send('Hello World!'))

import authRouter from './routes/auth.route.js';
app.use('/api/auth', authRouter);
import userRouter from './routes/user.route.js';
app.use('/api/user', userRouter);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Log stack trace for debugging

  // Default error response structure
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errors = err.errors || [];
  const success = err.success 

  console.log(statusCode, message)
  // Send JSON response to frontend
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    errors,
    success,
  });
});




export default app;