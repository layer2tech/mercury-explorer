const db = require("../models");
const Statechain = db.statechains;

exports.create = (req, res) => {
  res.status(500).send({message: 'Server does not accept post requests'})
};

exports.findByAddress = (req,res) => {
  const id = req.params.id;
  
}