const express = require('express');
const data = require('../control/data');
const json = require('../data');
const router = express.Router();

router.get('/',function(req,res,next){
    res.jsonp(json);
   // console.log(json[0].title);
})

router.post('/',function(req,res,next){

})
module.exports = router;