const express = require('express');
// var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const eventEmitter = require('events');
const fs = require('fs');
const mainUrl = 'https://movie.douban.com/top250';
var result = [];
class MyEmitter extends eventEmitter {
};
const myEmitter = new MyEmitter();
myEmitter.on('writefile',(result) => {
    fs.writeFile('data.json',JSON.stringify(result,null,2),'utf8',function(err){
        if(err){
            return console.log(err);
        }
          console.log(result.length);
    })
});
myEmitter.on('getContent',(url) => {
    request(url,'GET',function(error,response,body){
        if(!error && response.statusCode == 200){
            $ = cheerio.load(body);
            $('.item').each(function(index,item){
                let title = $(this).find('.info').find('a').children().first().text();
                let score = $(this).find('.bd').find('.star').find('.rating_num').text();
                let imgUrl = $(this).find('.pic').find('a').find('img').attr('src');
                let rating =$(this).find('.bd').find('.star').children().last().text();
                let message = $(this).find('.bd').children().first().text();
                let article = $(this).find('.bd').find('.inq').text();
                let num = $(this).find('.pic').find('em').text();
                let ref = Math.ceil(parseInt($(this).find('.pic').find('em').text())/25);
                let subLink = $(this).find('.pic').find('a').attr('href');
                  request(subLink,'GET',function(error,response,body){
                        if(!error && response.statusCode == 200){
                            $ = cheerio.load(body);
                            var video= $('.info').children().last().attr('href');
                            var temp = {
                                'ref':ref,
                                'num':num,
                                'title':title,
                                'score':score,
                                'imgUrl':imgUrl,
                                'rating':rating,
                                'message':message,
                                'article':article,
                                'video':video
                            };
                            result.push(temp);
                        }

                })
                // console.log(subLink);
                // request(item,'GET',function(error,response,body){
                //         if(!error && response.statusCode == 200){
                //             $ = cheerio.load(body);
                //             var imgurl = $('.nbgnbg').attr('src');
                //             var actor = $('.info').find('attrs').find('a').text();
                //             var video = $('.info').children().last().attr('href');
                //             var description =$('#link-report').find('.short').children().first().text();
                //
                //             let content = {
                //                 'imgUrl': imgUrl,
                //                 'actor':actor,
                //                 'video':video,
                //                 'description':description
                //             }
                //         }
                //     })

            });
        } else{
            console.log(response.statusCode);
            console.log('not success');
        }
    });
})

// router.get('/',function(req,res,next){
  module.exports = function (){
    for(let i = 0;i <10;i++){
        myEmitter.emit('getContent',mainUrl+'?start='+25*i+'&filter=');
    }
    console.log(result);
    if(result.length == 250){
        console.log(result.length);
        myEmitter.emit('writefile',result);
    }
};

