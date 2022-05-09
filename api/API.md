**API Docs** 

https://api.mercurywallet.com/

* **Method:**
  
  `GET`
  
*  **URL Params**

   /csv

* **Data Params**

  swapvolume_pastday: integer,
  // number of batch transfers ( swaps ) in the past day
  
  value_sats: integer,
  // total value currently in mercury wallet ( in satoshis )
  
  statecoins_created: integer,
  // All time total number of statecoins
  
  liquidity: integer,
  // Current number of statecoins in mercury wallet
  
  batchtransfers: BatchTransfer[
    {
      batch_id: str,
      finalized_at: ISO date,
      statechains: str,
    }
  ],
  // Batch transfer data past 24 hours
  
  tx_pastday: integer,
  // number of transactions in the past day
  
  tx: Tx[
      {
       statechain_id: str,
       addresss: str,
       amount: int,
       event: str,
       inserted_at: unix timestamp,
       locktime: ISO date
      }
    ],
  // Transactions in the past 24 hours
  
  updated: Unix Timestamp,
  // When data was last updated

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** CSV<br />
    "\"_id\",\"swapvolume_pastday\",\"value_sats\",\"statecoins_created\",\"liquidity\",\"batchtransfers\",\"tx_pastday\",\"tx\",\"updated\"\r\n
    \"1\",\"70\",\"511200000\",\"308\",\"106\",\"\"_id\",\"batch_id\",\"finalized_at\",\"statechains\"\r\n
                                              \"6278d1b047de784b06a209a9\",\"df22b086-fcdf-4a1d-8cce-27348d76b5e0\",\"Mon May 09 2022 08:19:30 GMT+0000 (Coordinated Universal Time)\",\"66602643-5abf-40d6-b678-645abbad2f55\"\"\r\n\", \"6\",
                                      \"\"_id\",\"statechain_id\",\"address\",\"amount\",\"event\",\"inserted_at\",\"locktime\",\"txid_vout\"\r\n\
"626a970b47de784b0636aea2\",\"57043932-d583-4e2e-b326-a4f03ffc65f3\",\"sc1q28mgpjk7ukaga7lz8xlqk0nm9phyjn6dse9ge8xxlpykqugcsevvs36mj3\",\"100000\",\"TRANSFER\",\"1652091644892\",\"Mon May 09 2022 09:03:32 GMT+0000 (Coordinated Universal Time)\",\"3500f0de18ac9ab8fcd8d9a6b2db6623b5e3a1a26f10a038341d7ea3ba062006:0\" "\r\n\",\"1652091799238\"\r\n"
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Example Call:**

https://api.mercurywallet.com/csv
