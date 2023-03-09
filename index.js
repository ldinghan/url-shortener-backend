const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UrlModel = require('./models/UrlLinks');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://ldinghan:mongoDB@urllinks.0muggcx.mongodb.net/test"
);

app.get("/getShortUrl", (req, res) => {
    UrlModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/shortenUrl", async (req, res) => {
    const url = req.body;
    const newShortUrl = new UrlModel(url);
    await newShortUrl.save();

    res.json(user);
})


app.listen(3001, () => {
    console.log('server is running');
})