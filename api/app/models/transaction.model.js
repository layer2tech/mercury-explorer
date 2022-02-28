module.exports = mongoose => {
  var schema = new mongoose.Schema({
    statechain_id:{ type:String, index: true, unique: true },
    user_id:{ type: Number, default:0, index: true },
    txid_vout: { type: String, lowercase: true, index: true},
    amount: { type: Number, default: 0, index: true},
    address: { type: String, index: true},
    event: {type: String, index: true},
    locktime: { type: Number, default: 0, index: true},
    inserted_at: { type: Date}
}, {id: false});

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Transaction = mongoose.model("transactions", schema);
  return Transaction;
};