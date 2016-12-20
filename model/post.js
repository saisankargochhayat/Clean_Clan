var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var postSchema = new Schema({
  date: { type: Date, default: Date.now },
  heading : String,
  like_count :{type:Number,default:0},
  stake_holders:String,
  likes:[String],
  author_name:String,
  description : String,
  author : String,
  location : String,
  type_post:{ type: String, default: "Solution" },
  author_image:String,
  image_before: String,
  image_after: String,
  solutions : String
},{collection:'post'})
var Post = mongoose.model('Post',postSchema);
module.exports = Post;
