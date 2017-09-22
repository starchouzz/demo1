const express = require('express');
const router = express.Router();
const iconv = require('iconv-lite');
const modelUser = require('../control/db').modelUser1;

router.get('/',function(req,res,next){
       res.json();
})
router.post('/',function(req,res,next){
       var postData = {
              name:req.body.user
       };
       // console.log(postData);
       modelUser.findOne(postData,function(err,data){
            if(err){
                console.log(err);
            }
            if(data && data.password == req.body.password&&data.status != "up"){
                modelUser.update(postData,{"status":"up"},function(err,result){
                     if(err) {
                         console.log(err);
                         res.json({"msg":"登录失败"});
                     } else{
                         var str =data.src;
                         var collect = data.collect;
                         // res.header('Access-Control-Allow-Origin', '*');
                         // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
                         // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
                         res.json({"errno":0,"src":str,"collect":collect});
                     }

                })

            } else if(!data){
                 res.json({"msg":"未注册或用户名错误"});
            } else if(data && data.password != req.body.password){
                 res.json({"msg":"密码错误"});
            } else if(data && data.password == req.body.password&&data.status == "up"){
                  res.json({"msg":"该用户已登录"});
            }

       })
  })
  module.exports = router;