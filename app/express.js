import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import routes from './routes/index.js'

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
export default app;