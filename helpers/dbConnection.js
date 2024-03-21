
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import config from "./config/config.js";

const dotenvconfig = dotenv.config();
const PORT = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, 
	{ 
		// useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true, 
	});
mongoose.connection.on("error", () => {
	throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});