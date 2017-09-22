const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1;

router.get('/',function(req,res,next){
      res.json();
})

router.post('/',function(req,res,next){
       let postData1 = {
             name:req.body.user
       };
       let postData2 = {
           ref:req.body.ref,
           num:req.body.num,
           title:req.body.title,
           score:req.body.score,
           imgUrl:req.body.imgUrl
       }
       modelUser.update(postData1,{ $push : {"collect": postData2}}
        ,function(err,result){
            if (err) return console.error(err);
            res.jsonp({"msg":"收藏成功"});
        });
})

module.exports = router;