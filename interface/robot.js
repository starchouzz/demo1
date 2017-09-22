const express = require('express');
const router = express.Router();
const superagent = require('superagent');

router.get('/',function(req,res,next){
     var response = res
     var info = req.query.info
     var userid = req.query.id
     var key = "66a85302c8b34e7491e0ee880784a8db"
     superagent.post('http://www.tuling123.com/openapi/api')
         .send({info,userid,key})
         .end((err,res) => {
            if(err){
                console.log(err)
            }
            response.json({data:res.text})
     })
})

module.exports =  router;