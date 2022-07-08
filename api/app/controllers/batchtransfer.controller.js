const db = require("../models");
const BatchTransfer = db.batchtransfers;

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

exports.findRecent = async (req, res) => {
  
  var today = new Date(Date.now()).toISOString();
  // the date today

  today = today.slice(0,10);
  // the date in format : YYYY-MM-DD

  var todayUnix = new Date(today).getTime();

  var daysAgo6 = todayUnix - (86400000*6);

  daysAgo6 = new Date(daysAgo6);

  const pipeline = [
    {
      '$match': {
        'finalized_at': {
          $gt : daysAgo6
        }
      }
    }
  ]

  await BatchTransfer.aggregate(pipeline)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "error occurred while finding Transaction"
        });
    });

};

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

exports.findByBatchID = async (req,res) => {
  
  const id = req.params.id;
  
  //  CHANGE USER_ID FOR STATECHAIN_ID in ''foreignField': 'user_id','
  const pipeline =[
    {
      '$match': {
        'batch_id': id
      }
    }, {
      '$unwind': '$statechains'
    }, {
      '$lookup': {
        'from': 'statechains', 
        'localField': 'statechains', 
        'foreignField': 'statechain_id', 
        'as': 'tx'
      }
    }, {
      '$unwind': '$tx'
    }, {
      '$lookup': {
        'from': 'transactions', 
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
        'updated_at': {'$toDate': '$tx.updated_at'},
        'address': '$transactions.address'
      }
    }
  ]

  await BatchTransfer.aggregate(pipeline)
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