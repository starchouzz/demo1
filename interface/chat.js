const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1;

router.get('/',function(req,res,next){
     res.jsonp();
})

router.post('/',function(req,res,next){
     let postData = {
         "status" : "up"
     };
     modelUser.count(postData,function(err,count){
         if(err) console.log(err);
         console.log(count);
         res.json({"num":count});
     })
})

module.exports = router;