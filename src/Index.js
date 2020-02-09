const express = require("express");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const path = require('path');
const router = require("./routers/router")


const app = express();

mongoose.connect('mongodb://heroku_6pvkdxlq:vhd93mmimhnu3td0fa8rm0d1di@ds217799.mlab.com:17799/heroku_6pvkdxlq/test-task-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`)
})