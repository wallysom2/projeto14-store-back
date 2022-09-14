import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoute.js';

dotenv.config ();

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRoutes);

const port = process.env.PORT_API;

server.listen (port, () => {
    console.log(`Server is running on port ${port}.`)
})
