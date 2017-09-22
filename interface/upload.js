const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1;
const fs = require('fs');

router.get('/',function(req,res,next){
    res.jsonp();
})

router.post('/',function(req,res,next){
    // var time = Date.parse(new Date());
    //接收前台POST过来的base64
    var imgData = req.body.imgUrl;
    //过滤data:URL
    // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    // var dataBuffer = new Buffer(base64Data, 'base64');
    // var datasrc = "pic/"+time+"-image.png";
    // fs.writeFile(datasrc, dataBuffer, function(err) {
    //     if(err){
    //         console.log(err);
    //     }else{;
    //         res.json({"msg":"保存成功！"})
    //     }
    // });
    var postdata1 = {
        name : req.body.user
    }

    modelUser.update(postdata1,{"src":imgData},
        function(err,result){
          if(err){
              console.log(err);
          }
          console.log(result);
          res.json({"msg":"上传成功"});
    })
})

module.exports = router;