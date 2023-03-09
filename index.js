const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UrlModel = require('./models/UrlLinks');

const cors = require('cors');
const { exists } = require('./models/UrlLinks');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://ldinghan:mongoDB@UrlLinks.0muggcx.mongodb.net/test"
);

app.get("/getShortUrl", async (req, res) => {
    const targetUrl = req.query.q;
    const query = await UrlModel.find({targetUrl}).exec();
    res.json(query[0].shortUrl);
});

const makeShortUrl = (k) => {
    str = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < k; i ++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return str;
}


app.post("/shortenUrl", async (req, res) => {
    console.log(req.body);
    const url = req.body;
    targetUrl = url.targetUrl;
    existingTargetUrl = await UrlModel.exists({targetUrl});
    if (existingTargetUrl == null) {
        counter = 6;
        shortUrl = makeShortUrl(counter);
        existingShortUrl = await UrlModel.exists({shortUrl});
        while (existingShortUrl != null) {
            counter++;
            shortUrl = makeShortUrl(counter);
            existingShortUrl = await UrlModel.exists({shortUrl});
        }
        
        
        newUrlObj = {
            targetUrl,
            shortUrl
        }

        const newShortUrl = new UrlModel(newUrlObj);
        await newShortUrl.save();
    }


    res.json(url);
})

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const existingShortUrl = await UrlModel.exists({shortUrl});
    if (existingShortUrl == null) {
        return res.sendStatus(404);
    }
    const query = await UrlModel.find({shortUrl}).exec();
    const targetUrl = query[0].targetUrl;
    res.status(301).redirect(targetUrl);
})





app.listen(3001, () => {
    console.log('server is running');
})