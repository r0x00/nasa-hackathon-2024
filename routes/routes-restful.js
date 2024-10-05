const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/settings', function(req, res, next) {
    res.send({
        TOMTOM_KEY: process.env.TOMTOM_KEY
    });
});

module.exports = router;
