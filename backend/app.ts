import express from 'express';
import { Response, Request, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app : Application =express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

app.get('/', (
    req:Request,
    res:Response
) => {
    res.status(200).json({
        success : true,
        message : "I'm up and running !!"
    });
});

export default app;
