import app from './app/express.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import config from "./config/config.js";

const dotenvconfig = dotenv.config();
const PORT = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on("error", () => {
	throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to app"});
})

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server started on port ${PORT}`);
})
