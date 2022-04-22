****API Docs**** 


* **Method:**
  
  `GET`
  
*  **URL Params**

   /tx

* **Data Params**

  address: string,
  inserted_at: unix timestamp,
  txid_vout: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ 
    address : "sc1q0992jaj3je6z7qdw.....f8rnw3c3lpxy5axsnnvszdlkpwg",
    inserted_at: 1647958588269,
    txid_vout: "acae7daf02b4e1ba.....0dc5f148eb3df6347580bff:4"
    }, { 
    address : "sc1q0992jaj......w3c3lpxy5axsnnvszdlkpwg",
    inserted_at: 1647958588269,
    txid_vout: "acae7daf02b4e1....3df6347580bff:4"
    }]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/tx
  
* **Method:**
  
  `GET`
  
*  **URL Params**

   /tx/{:id}

* **Data Params**

  address: string,
  event: string,
  amount: integer,
  locktime: timestamp,
  txid_vout: string,
  confirmed: bool,
  updated_at: unix timestamp,
  chain: Object

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    address: "tc1q2nyftcy899gd07ranlac5h6esugm9mfmy6ajnp2upl8kzv5r9pg52dxu34",
    event: "TRANSFER",
    amount: 100000,
    locktime: 2021-11-25T23:23:24.599+00:00,
    txid_vout: "156fa6db5d14515835b.....d29b0fafcd0f9e25658e07407dcb9:0",
    confirmed: true,
    updated_at: 1647958589720,
    chain: [{"data": "02403f36011d29d97140b6b.....d0a799460fd58fa46543ee1559d","next_state": 
             {"purpose": "TRANSFER", "data": "0309ab698cd44374fbe5b0cad18d478f52bb90e193bc698b7a13e97754bf00a67c", "sig":                    
                  "3044022074...16ff3539e26ff75a.....c3427748da1e2731"}},
              {"data":"0309ab698cd4437.....478f52bb90e193bc698b7a13e97754bf00a67c", "next_state": null
      }]
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/tx/{:id}
    
* **Method:**
  
  `GET`
  
*  **URL Params**

   /address/{:id}

* **Data Params**

  address: string,
  event: string,
  inserted_at: unix timestamp,
  amount: integer,
  locktime: timestamp,
  txid_vout: string,
  confirmed: bool,

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      address: "sc1q0992jaj3je6z7qdwvu9...zf8rnw3c3lpxy5axsnnvszdlkpwg",
      event: "WITHDRAWAL",
      inserted_at: 1647958588269,
      amount: 100000,
      locktime: 2021-10-30T07:25:33.254+00:00,
      txid_vout: "a318769b1b78600b33d42563...cd778d95a40bf9a6b0a43534e0fed522:0",
      confirmed: true,
    }`
    

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/address/{:id}

* **Method:**
  
  `GET`
  
*  **URL Params**

   /swap

* **Data Params**

  batch_id: string,
  statechains: Array[string],
  finalized_at: timestamp

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
      batch_id: "f13a8186-5dd-92406e88e57a",
      statechains: [    "158b081b-c192-4f8b-b907-78871eb342f9",    "1ecd29b2-2fc5-4404-902a-880ed1baf395"  ],
      finalized_at: 2021-11-25T12:18:50.459+00:00
    }]`
    

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/swap
  
  * **Method:**
  
  `GET`
  
*  **URL Params**

   /swap/{:id}

* **Data Params**

  txid_vout: string,
  amount: integer,
  updated_at: unix timestamp,
  address: string,
  batch_id: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
      txid_vout: "8f8faefdb076b1f33d5273f3758be1db8b0199d8b0cc075da7f638e635bc8472:1",
      amount: 100000,
      updated_at: 1647958588270,
      batch_id: "da650acd-ca01-450d-88b2-0f862db2c3e8",
      address: "tc1qvkqqtcgkza40mq2cwumxzsxx2mqkwtsur4w7nzdeywf48yaguw9wz3qw5m"
    }]`
    

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

 https://api.mercurywallet.com/api/swap/{:id}
 
 
 

  
* **Method:**
  
  `GET`
  
*  **URL Params**

   /summary

* **Data Params**

  total_coins: integer,
  total_swapped: integer,
  total_value: float,
  total_withdrawn: integer,
  total_transfers: integer

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      total_coins: 102,
      total_swapped: 11003,
      total_value: 21.78,
      total_withdrawn: 3.454,
      total_transfers: 124423
    }`

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/summary  
  
  
* **Method:**
  
  `GET`
  
*  **URL Params**

   /histo/deposit

* **Data Params**

  _id: integer,
  count: integer

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
        _id: 100000
        count: 65},
      {
        _id: 10000000,
        count: 42
      },
      {
        _id: 1000000,
        count: 32
      },
      {
        _id: 500000,
        count: 23
      }
      ]`
    

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/histo/deposit
  

* **Method:**
  
  `GET`
  
*  **URL Params**

   /histo/withdraw

* **Data Params**

  _id: integer,
  count: integer

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
        _id: 100000
        count: 6},
      {
        _id: 10000000,
        count: 4
      },
      {
        _id: 1000000,
        count: 3
      },
      {
        _id: 500000,
        count: 2
      }
      ]`
    

 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/histo/withdraw
