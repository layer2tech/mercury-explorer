const db = require("../models");
const Transaction = db.transactions;

exports.create = (req, res) => {
  res.status(500).send({message: 'Server does not accept post requests'})
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Transaction.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Couldn't find Transaction with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error finding Transaction with id: " + id });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? {id: { $regex: new RegExp(id), $options: "i" } } : {};
  Transaction.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occurred while finding Transaction"
      });
    });
};