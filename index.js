import express from 'express';
import cors from 'cors';    
import { init } from './src/init.js';
import morgan from 'morgan';
import { dbConnection } from './DB/Connection.js';
import dotenv from 'dotenv';
dotenv.config()


const app = express();
const port = 3000
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


 init(app);
 dbConnection();

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`)
}) 