import express from 'express'
import connectDB from './config/mongodb.js';
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routes/userRoute.js';



// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json())
app.use(cors())

// API endpoints
app.use('/api/user', userRouter)

app.listen(port, () => console.log("Server started on Port : " + port));