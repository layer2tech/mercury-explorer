const db = require("../models");
const BatchTransfer = db.batchtransfers_testnet;

exports.create = (req, res) => {
  res.status(500).send({message: 'Server does not accept post requests'})
};

// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   BatchTransfer.find({"batch_id": id})
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Couldn't find BatchTransfer with id: " + id });
//       else{
//         res.send(data);
//       }
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error finding BatchTransfer with id: " + id });
//     });
// };

exports.findAll = async (req, res) => {

  await BatchTransfer.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occurred while finding BatchTransfer"
      });
    })

};

exports.findByBatchID = (req,res) => {

  const id = req.params.id;

  //  CHANGE USER_ID FOR STATECHAIN_ID in ''foreignField': 'user_id','
  const pipeline =[
    {
      '$match': {
        'batch_id': '3305a422-6245-4219-b164-8b7f9738685d'
      }
    }, {
      '$unwind': '$statechains'
    }, {
      '$lookup': {
        'from': 'statechains_tests', 
        'localField': 'statechains', 
        'foreignField': 'statechain_id', 
        'as': 'tx'
      }
    }, {
      '$unwind': '$tx'
    }, {
      '$lookup': {
        'from': 'transactions_tests', 
        'localField': 'tx.txid_vout', 
        'foreignField': 'txid_vout', 
        'as': 'transactions'
      }
    }, {
      '$unwind': '$transactions'
    }, {
      '$project': {
        'batch_id': '$batch_id', 
        'txid_vout': '$tx.txid_vout', 
        'amount': '$tx.amount', 
        'updated_at': {
          '$toDate': '$tx.updated_at'
        }, 
        'address': '$transactions.address'
      }
    }
  ]

  BatchTransfer.aggregate(pipeline)
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