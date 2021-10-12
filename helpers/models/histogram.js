var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var HistogramSchema = new Schema({
  amount: { type: Number, unique: true, index: true},
  frequency: {type: Number, default:0,index: true}
}, {id: false});


module.exports = mongoose.model('Histogram', HistogramSchema);