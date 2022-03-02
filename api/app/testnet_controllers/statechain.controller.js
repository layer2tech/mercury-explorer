const db = require("../testnet_models");
const Statechain = db.statechains_testnet;

exports.create = (req, res) => {
  res.status(500).send({message: 'Server does not accept post requests'})
};

exports.findByAddress = (req,res) => {
  const id = req.params.id;
  
}