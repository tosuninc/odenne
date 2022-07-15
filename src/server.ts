import {config} from 'dotenv';
config();
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import Init from './grpc/init'

const grpcInit = new Init();
console.log(grpcInit.getServiceCount() + " Services Started");
import helmet from 'helmet';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
}))
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());

import battleRouter from './routes/battle';
import skillRouter from './routes/skills';


app.use('/battle', battleRouter);
app.use('/skills', skillRouter);

app.listen(process.env.PORT, () => {
    console.log(`Odenne is up at :${process.env.PORT}`)
});