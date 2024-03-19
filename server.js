import app from './app/express.js'
const PORT = 3000;
app.get("/", (req, res) => {
    res.json({message: "Welcome to app"});
})

app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server started on port ${PORT}`);
})