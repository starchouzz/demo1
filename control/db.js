var mongoose = require('mongoose');
//收藏存放在collect中
var userSchema1 = new mongoose.Schema({
      name:{type:String,unique:true},
      password:String,
      status:{type:String,default:'down'},
      src:String,
      collect:[{
          _id:false,
          ref:Number,
          num:Number,
          title:String,
          score:Number,
          imgUrl:String,
          day:{type:Date,default:Date.now}
       }],
      rating:[{
        name: String,
        msg:String,
        title:String,
        fed:[{
           fedname:String,
           fedmsg:String,
           date:{type:Date,default:Date.now}
        }],
        date:{type:Date,default:Date.now}
       }],
      date:{type:Date,default:Date.now}
});

var userSchema2 = new mongoose.Schema({
    username: String,
    src: String,
    msg: {
        type: String,
        default: ''
    },
    roomid: String,
    img: {
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: Date.now()
    }
});
exports.modelUser1 = mongoose.model('user',userSchema1);
exports.modelUser2 = mongoose.model('message',userSchema2)

