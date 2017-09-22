const express = require('express');
const router = express.Router();
const modelUser = require('../control/db').modelUser1;

router.get('/',function(req,res,next){
    var title = req.query.title
    modelUser.find({"array":{"title":title}})
        .then((err,data) => {
        if(err) console.log(err);
        console.log(data)
    })
})

router.post('/',function(req,res,next){
        let postData = {
            name:req.body.user,
            msg:req.body.message,
            title:req.body.title
        };
        modelUser.update({name:req.body.user},{$push : {rating:postData}})
            .then( (err,result) => {
                console.log(result);
               if(err) console.error(err);
                   res.json({"errno": 1})


         })
})

module.exports = router;