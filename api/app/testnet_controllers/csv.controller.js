const db = require("../models");
const Transaction = db.transactions;
const fs = require('fs');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const CSVFileValidator = require('csv-file-validator');

let dataVariable


const csvWriter = createCsvWriter({
  path: './data.csv',
  header: [ "_id", "swapvolume_pastday", "value_sats", "statecoins_created","liquidity", "tx_pastday", "updated" ]
})


exports.getSummary = async (req,res) => {
    let yesterday = new Date(Date.now() - 8.6E7).toISOString();

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
                '$batchtransfers.finalized_at', { '$dateFromString': {
                   'dateString': yesterday
                } }
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
            'tx_pastday': {
              '$sum': 1
            }
          }
        }
      ]

    let date = Date.now();

    if( dataVariable  && (date - dataVariable[0].updated <= 8.6E7)){//8.6E7
      // If static saved in last day - dont query db
      console.log('From Static Variable')

      fs.readFile('./data.csv', function read(err, data){
        if(err){
          throw err
        }
        res.send(data)
      })

    }
    else{
      console.log('From DB')

      Transaction.aggregate(pipeline)
        .then(data => {
          data[0].updated = Date.now();
          
          dataVariable = data;
          
          csvWriter.writeRecords([Object.values(data[0])]).then(
            item =>{
              
              fs.readFile('./data.csv', function read(err, data){
                if(err){
                  throw err
                }
                res.send(data)
              })
            }
          ).catch(err => {console.log("ERROR", err)})
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "error occurred while finding Summary"
            });
        });
    }
  }