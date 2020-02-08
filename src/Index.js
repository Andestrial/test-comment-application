const express = require("express");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const path = require('path');
const router = require("./routers/router")


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/test-task-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`)
})