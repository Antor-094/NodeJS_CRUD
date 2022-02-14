const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.get('/',(req, res, next) => {

    res.status(200).json({
        message: "Get Request"
    })
})

router.post('/',(req, res, next) => {

    res.status(201).json({
        message: "Post Request"
    })
})


module.exports = router;