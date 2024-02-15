const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/", require('./routes/todoRoute.js'));

app.use((req, res, next) => {
    res.status(404).json({
        error: "Page not found"
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});