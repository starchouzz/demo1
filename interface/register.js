const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1;

router.get('/',function(req,res,next){
    res.render('register',{title:'注册'});
});
router.post('/',function(req,res,next){
    var postData = {
        name:req.body.user,
        password:req.body.password,
        src:req.body.src
    }
    modelUser.count({name:req.body.user},function(err,count){
        if(err){
            console.log(err);
        }
        if(count==0){
            modelUser.create(postData,function(err,doc){
                if(err) console.log(err);
                res.json({"errno":0,"msg":"注册成功"});
               })
        }else{
               res.json({"errno":1,"msg":"该用户已经注册"});

        }
    })
})

module.exports = router;