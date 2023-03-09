const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    targetUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
});

const UrlModel = mongoose.model("urllinks", UrlSchema);