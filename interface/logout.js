const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1

router.get('/',function(req,res,next){
    res.json();
})
router.post('/',function(req,res,next){
    var postData = {
        name:req.body.user
    };
    modelUser.update(postData,{"status":"down"},function(err,result){
                if(err)  console.log(err);
                console.log(result);
                res.json({"msg":"注销成功"});
            })
    })

module.exports = router;