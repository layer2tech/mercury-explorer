var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var SwapSchema = new Schema({
  batch_id: { type: String, lowercase: true, unique: true, index: true},
  Swap: {type: Array, default:[],index: true},
  updated_at: { type: Date}
}, {id: false});


module.exports = mongoose.model('Swap', SwapSchema);