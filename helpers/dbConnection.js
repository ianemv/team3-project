
import mongoose from 'mongoose';
import config from "../config/config.js";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);
mongoose.connection.on("error", () => {
	throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});