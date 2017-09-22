const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1

router.get('/',function(req,res,next){
     res.json();
})

router.post('/',function(req,res,next){
     modelUser.update({"name":req.body.name,"date":req.body.date},
         {$push : {"fed": {"name":req.body.user,"rating":req.body.message}}},
          function(err,result){
              if(err) console.log(err);
              res.json({"msg":"success"});
         })
})

module.exports = router;