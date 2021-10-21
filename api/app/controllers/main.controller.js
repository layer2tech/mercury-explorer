const db = require("../models");

const BatchTransfer = db.batchtransfers;
const Statechain = db.statechains;
const Transaction = db.transactions;

exports.create = (req, res) => {
    res.status(500).send({message: 'Server does not accept post requests'})
};

// GET /tx
exports.findAllTransactions = (req,res) => {
    const pipeline = [
        {
          '$project': {
            'txid_vout': '$txid_vout', 
            'address': '$address', 
            'inserted_at': '$inserted_at'
          }
        }
    ]

    Transaction.aggregate(pipeline)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "error occurred while finding Transaction"
            });
        });
}

//GET /tx/:id
exports.findByTxID = (req,res) => {
    const id = req.params.id

    const pipeline = [
        {
          '$match': {
            'txid_vout': id
          }
        }, {
          '$lookup': {
            'from': 'statechains', 
            'localField': 'txid_vout', 
            'foreignField': 'txid_vout', 
            'as': 'statechains'
          }
        }, {
          '$unwind': '$statechains'
        }, {
          '$project': {
            'txid_vout': '$txid_vout', 
            'address': '$address', 
            'event': '$event', 
            'amount': '$amount', 
            'locktime': '$locktime', 
            'confirmed': '$statechains.confirmed', 
            'chain': '$statechains.chain', 
            'updated_at': '$statechains.updated_at'
          }
        }
    ]

    Transaction.aggregate(pipeline)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "error occurred while finding Transaction"
            });
        });
}