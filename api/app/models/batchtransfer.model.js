module.exports = mongoose => {
  var schema = new mongoose.Schema({
      batch_id: { type: String, lowercase: true, unique: true, index: true},
      statechains: [],
      finalized_at: { type: Date}
  }, {id: false});

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Batchtransfer = mongoose.model("batchtransfers", schema);
  return Batchtransfer;
};