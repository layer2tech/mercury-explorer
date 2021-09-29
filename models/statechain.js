var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var StatechainSchema = new Schema({
  txid_vout: { type: String, lowercase: true, unique: true, index: true},
  sharedpub: { type: String, index: true},
  amount: { type: Number, default: 0, index: true},
  block_expiry: { type: Number, default: 0, index: true},
  user_id:{type: Number, default:0, index: true},
  chain: {type: Object, index: true},
  updated_at: { type: Date}
}, {id: false});


module.exports = mongoose.model('Statechain', StatechainSchema);

