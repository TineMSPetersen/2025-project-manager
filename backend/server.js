import express from 'express'
import connectDB from './config/mongodb.js';
import 'dotenv/config'



// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
