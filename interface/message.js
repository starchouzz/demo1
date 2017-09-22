const express = require('express');
const router = express.Router();
const modelUser2  = require('../control/db').modelUser2;

router.get('/', function (req, res,next) {
    // res.json({"hello":"world"});
    var id = req.query.roomid
    modelUser2.find({roomid: id}).sort({"time": 1}).limit(80).exec(function (err, message) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                errno: 0,
                data: message
            })
        }
    })
});

router.post('/',function(req,res,next){

});
module.exports = router;