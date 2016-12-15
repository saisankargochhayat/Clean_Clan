var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var postSchema = new Schema({
  date: { type: Date, default: Date.now },
  heading : String,
  like_count :{type:Number,default:0},
  stake_holders:String,
  description : String,
  author : String,
  location : String,
  image_before : Buffer,
  image_before_type : String,
  image_after : Buffer,
  image_after_type : String,
},{collection:'post'})
var Post = mongoose.model('Post',postSchema);
module.exports = Post;
