const db = require("../models");
const BatchTransfer = db.batchtransfers;

exports.create = (req, res) => {
  res.status(500).send({message: 'Server does not accept post requests'})
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  BatchTransfer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Couldn't find BatchTransfer with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error finding BatchTransfer with id: " + id });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? {id: { $regex: new RegExp(id), $options: "i" } } : {};
  BatchTransfer.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occurred while finding BatchTransfer"
      });
    });
};