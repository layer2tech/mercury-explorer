const db = require("../models");
const Transaction = db.transactions_testnet;

let dataVariable

function arrayToCSV(objArray) {
    // convert an array of objects to CSV
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    return array.reduce((str, next) => {
        str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
        return str;
       }, str);
}

function dataset2CSV(data){
    // convert our dataset to CSV
    let csv = data
    // tx = data[0].tx
    // batchtransfers = data[0].batchtransfers
    csv[0].tx = arrayToCSV( data[0].tx )

    csv[0].batchtransfers = arrayToCSV( data[0].batchtransfers )

    csv = arrayToCSV(csv)

    return csv
}

exports.getSummary = (req,res) => {
    var yesterday = new Date()

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
            'from': 'transactions', 
            'localField': 'string', 
            'foreignField': 'string', 
            'as': 'transactions'
          }
        }, {
          '$unwind': '$transactions'
        }, {
          '$match': {
            'transactions.event': 'WITHDRAWAL'
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
              '$sum': '$transactions.amount'
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
            'from': 'batchtransfers', 
            'localField': 'string', 
            'foreignField': 'string', 
            'as': 'batchtransfers'
          }
        }, {
          '$unwind': '$batchtransfers'
        }, {
          '$unwind': '$batchtransfers.statechains'
        }, {
          '$project': {
            'liquidity': {
              '$subtract': [
                '$deposited_coins', '$withdrawn_coins'
              ]
            }, 
            'value_sats': {
              '$subtract': [
                '$total_deposit', '$total_withdrawn'
              ]
            }, 
            'statecoins_created': '$deposited_coins', 
            'pastday_batch': {
              '$gt': [
                '$batchtransfers.finalized_at', yesterday.setDate(0) - 1
              ]
            }, 
            'batchtransfers': '$batchtransfers'
          }
        }, {
          '$match': {
            'pastday_batch': true
          }
        }, {
          '$group': {
            '_id': '$_id', 
            'swapvolume_pastday': {
              '$sum': 1
            }, 
            'value_sats': {
              '$first': '$value_sats'
            }, 
            'statecoins_created': {
              '$first': '$statecoins_created'
            }, 
            'liquidity': {
              '$first': '$liquidity'
            }, 
            'batchtransfers': {
              '$push': '$batchtransfers'
            }
          }
        }, {
          '$lookup': {
            'from': 'transactions', 
            'localField': 'string', 
            'foreignField': 'string', 
            'as': 'transactions'
          }
        }, {
          '$unwind': '$transactions'
        }, {
          '$project': {
            'liquidity': '$liquidity', 
            'value_sats': '$value_sats', 
            'statecoins_created': '$statecoins_created', 
            'swapvolume_pastday': '$swapvolume_pastday', 
            'batchtransfers': '$batchtransfers', 
            'transactions': '$transactions', 
            'pastday_tx': {
              '$gt': [
                '$transactions.inserted_at', (Date.now() - 8.6E7)
              ]
            }
          }
        }, {
          '$match': {
            'pastday_tx': true
          }
        }, {
          '$group': {
            '_id': '$_id', 
            'swapvolume_pastday': {
              '$first': '$swapvolume_pastday'
            }, 
            'value_sats': {
              '$first': '$value_sats'
            }, 
            'statecoins_created': {
              '$first': '$statecoins_created'
            }, 
            'liquidity': {
              '$first': '$liquidity'
            }, 
            'batchtransfers': {
              '$first': '$batchtransfers'
            }, 
            'tx_pastday': {
              '$sum': 1
            }, 
            'tx': {
              '$push': '$transactions'
            }
          }
        }
      ]
    var csv
    let date = Date.now();

    if( dataVariable  && (date - dataVariable[0].updated <= 8.64E7)){
        // If static saved in last day - dont query db
        
        res.json(arrayToCSV(dataVariable))
    }
    else{
        console.log('From DB')
        Transaction.aggregate(pipeline)
        .then(data => {
            data[0].updated = Date.now()
            dataVariable = data
            csv = dataset2CSV(data)
            res.json(csv)
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "error occurred while finding Transaction"
            });
        });
    }
  }