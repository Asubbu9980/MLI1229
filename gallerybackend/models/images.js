const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  name:  String,  
  image: String,
  category:String
});
const image = mongoose.model('image', imageSchema);
module.exports=image


