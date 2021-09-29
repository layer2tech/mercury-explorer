var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var TransactionSchema = new Schema({
  txid_vout: { type: String, lowercase: true, unique: true, index: true},
  address: { type: String, index: true},
  Event: {type: String, index: true},
  amount: { type: Number, default: 0, index: true},
  inserted_at: { type: Date}
}, {id: false});


module.exports = mongoose.model('Transaction', TransactionSchema);
