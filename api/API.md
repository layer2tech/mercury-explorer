* **Method:**
  
  `GET`
  
*  **URL Params**

   /tx

* **Data Params**

  address: string,
  inserted_at: timestamp,
  txid_vout: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ 
    address : "sc1q0992jaj3je6z7qdwvu993m87xvp7z2zf8rnw3c3lpxy5axsnnvszdlkpwg",
    inserted_at: 2021-10-28T19:20:26.320+00:00,
    txid_vout: "acae7daf02b4e1ba5193d8c1817f5d710a59980410dc5f148eb3df6347580bff:4"
    }, { 
    address : "sc1q0992jaj3je6z7qdwvu993m87xvp7z2zf8rnw3c3lpxy5axsnnvszdlkpwg",
    inserted_at: 2021-10-28T19:20:26.320+00:00,
    txid_vout: "acae7daf02b4e1ba5193d8c1817f5d710a59980410dc5f148eb3df6347580bff:4"
    }]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : ""error occurred while finding Transaction"" }`


* **Sample Call:**

  https://api.mercurywallet.com/api/tx
