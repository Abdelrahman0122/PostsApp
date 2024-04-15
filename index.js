import express from 'express';
import cors from 'cors';    
import { init } from './src/init.js';
import morgan from 'morgan';
import { dbConnection } from './DB/Connection.js';
import dotenv from 'dotenv';
import { app , server } from './src/socket/socket.js';
import multer from 'multer';
dotenv.config()


const port = process.env.PORT 

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

 
init(app);
dbConnection();

 server.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`)
}) 

