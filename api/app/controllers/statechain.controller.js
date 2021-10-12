const db = require("../models");
const Statechain = db.statechains;

exports.create = (req, res) => {
  res.status(500).send({message: 'Server does not accept post requests'})
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Statechain.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Couldn't find Statechain with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error finding Statechain with id: " + id });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? {id: { $regex: new RegExp(id), $options: "i" } } : {};
  Statechain.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occurred while finding statechains"
      });
    });
};