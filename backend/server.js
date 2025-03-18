import express from 'express'
import connectDB from './config/mongodb.js';
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routes/userRoute.js';
import projectRouter from './routes/projectRoute.js';
import connectCloudinary from './config/cloudinary.js';
import commissionRouter from './routes/commissionRoute.js';



// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors())

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/project', projectRouter)
app.use('/api/commission', commissionRouter)

app.listen(port, () => console.log("Server started on Port : " + port));