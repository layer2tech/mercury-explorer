const db = require("../models");
const Transaction = db.transactions_testnet;

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
          'inserted_at': {'$toDate': '$inserted_at'}
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
          'from': 'statechains_tests', 
          'localField': 'txid_vout', 
          'foreignField': 'txid_vout', 
          'as': 'statechains_tests'
        }
      }, {
        '$unwind': '$statechains_tests'
      }, {
        '$project': {
          'txid_vout': '$txid_vout', 
          'address': '$address', 
          'event': '$event', 
          'amount': '$amount', 
          'locktime': '$locktime', 
          'confirmed': '$statechains_tests.confirmed', 
          'chain': '$statechains_tests.chain', 
          'updated_at': {'$toDate': '$inserted_at'}
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

//GET /address/:id
exports.findByAddress = (req,res) => {
  const id = req.params.id;

  const pipeline = [
    {
        '$match': {
            'address': id
        }
    }, {
        '$lookup': {
            'from': 'statechains_tests', 
            'localField': 'txid_vout', 
            'foreignField': 'txid_vout', 
            'as': 'statechains_tests'
        }
    }, {
        '$unwind': '$statechains_tests'
    }, {
        '$project': {
            'address': '$address', 
            'event': '$event', 
            'inserted_at': {'$toDate': '$inserted_at'}, 
            'amount': '$amount', 
            'locktime': '$locktime', 
            'txid_vout': '$txid_vout', 
            'confirmed': '$statechains_tests.confirmed'
        }
    }
  ];

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

exports.getSummary = (req,res) => {
  const pipeline = [
    {
      '$group': {
        '_id': 1, 
        'total_deposit': {
          '$sum': '$amount'
        }, 
        'deposited_coins': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'transactions_tests', 
        'localField': 'string', 
        'foreignField': 'string', 
        'as': 'transactions_tests'
      }
    }, {
      '$unwind': '$transactions_tests'
    }, {
      '$match': {
        'transactions_tests.event': 'WITHDRAWAL'
      }
    }, {
      '$group': {
        '_id': 1, 
        'total_deposit': {
          '$first': '$total_deposit'
        }, 
        'deposited_coins': {
          '$first': '$deposited_coins'
        }, 
        'total_withdrawn': {
          '$sum': '$transactions_tests.amount'
        }, 
        'withdrawn_coins': {
          '$sum': 1
        }
      }
    }, {
      '$group': {
        '_id': 1, 
        'total_deposit': {
          '$first': '$total_deposit'
        }, 
        'deposited_coins': {
          '$first': '$deposited_coins'
        }, 
        'total_withdrawn': {
          '$first': '$total_withdrawn'
        }, 
        'withdrawn_coins': {
          '$first': '$withdrawn_coins'
        }
      }
    }, {
      '$lookup': {
        'from': 'batchtransfers_tests', 
        'localField': 'string', 
        'foreignField': 'string', 
        'as': 'batchtransfers_tests'
      }
    }, {
      '$unwind': '$batchtransfers_tests'
    }, {
      '$project': {
        'total_coins': {
          '$subtract': [
            '$deposited_coins', '$withdrawn_coins'
          ]
        }, 
        'total_deposit': '$total_deposit', 
        'total_withdrawn': '$total_withdrawn', 
        'deposited_coins': '$deposited_coins'
      }
    }, {
      '$group': {
        '_id': 1, 
        'total_coins': {
          '$first': '$total_coins'
        }, 
        'total_deposit': {
          '$first': '$total_deposit'
        }, 
        'total_withdrawn': {
          '$first': '$total_withdrawn'
        }, 
        'deposited_coins': {
          '$first': '$deposited_coins'
        }, 
        'total_swapped': {
          '$sum': 1
        }
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

exports.getDepositHistogram = (req,res) => {
  const pipeline = [
  {
      '$group': {
        '_id': '$amount', 
        'count': {
          '$sum': 1
        }
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

exports.getWithdrawHistogram = (req,res) => {
  const pipeline = [
    {
      '$match': {
        'event': 'WITHDRAWAL'
      }
    }, {
      '$group': {
        '_id': '$amount', 
        'count': {
          '$sum': 1
        }
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