# Mercury Explorer models

## Mongo DB Collections

### Transactions

This table lists all statechain 'events', i.e. all deposits, transfers and withdrawals. It is updated with a new row each time the main mercury `statechain` table is updated. 

If a new row is added to the `statechain` table, this is a `DEPOSIT`. If the `chain` column entry changes, then the event is the latest entry `purpose`. The latest `data` value in `chain` is the current owner proof key (sc address) or the withdrawal address. 

`txid:vout` is determined from the `backup_tx` column of the `user_id` in the mercury `usersession` table. 

#### sample table

statechain_id | user_id | txid:vout | amount | address | event | inserted_at
--- | --- | --- | --- | --- | --- | ---
0e8b56... | 12345... | d3fea7c...:0 | 100000 | sc1... | TRANSFER | 2018-11-02 16:59:19.000
90c878... | 22345... | 1e16db7...:1 | 100000 | sc1... | DEPOSIT | 2018-11-03 16:59:19.000
b559c2... | 32345... | bb16ee2...:0 | 100000 | bc1... | WITHDRAWAL | 2018-11-04 16:59:19.000
6feab3... | 42345... | 35b3138...:0 | 100000 | sc1... | TRANSFER | 2018-11-05 16:59:19.000

#### columns

- statechain_id: string
- user_id: String
- txid:vout: String
- amount: Int64
- address: String
- event: String
- inserted_at: Date

#### permissions
*read only*

### Statechains

This table lists all statechains, including withdrawn coins. It is updated whenever the main mercury `statechain` table is updated. 

#### sample table

statechain_id | user_id | txid:vout | amount | chain | sharedpub | updated_at | block_expiry | confirmed
--- | --- | --- | --- | --- | --- | ---
0e8b56... | 12345... | d3fea7c...:0 | 100000 | {"chain"... | 0354bca... | 2018-11-02 16:59:19.000 | 2097800 | true
90c878... | 22345... | 1e16db7...:1 | 100000 | {"chain"... | 023f022... | 2018-11-03 16:59:19.000 | 2097900 | false
b559c2... | 32345... | bb16ee2...:0 | 100000 | {"chain"... | 03354bc... | 2018-11-04 16:59:19.000 | 2097193 | true
6feab3... | 42345... | 35b3138...:0 | 100000 | {"chain"... | 03db31b... | 2018-11-05 16:59:19.000 | 2097202 | true

#### columns

- statechain_id: string
- user_id: String
- txid:vout: String
- amount: Int64
- chain: String
- sharedpub: String
- updated_at: Date

#### permissions
*read only*

### Batch Transfers

This table lists all finalized batch transfers. It is updated whenever the main mercury `transferbatch` table is updated with a `finalized` status. 

#### sample table

batch_id | statechains | finalized_at
--- | --- | --- 
0e8b56... | [12345...,...] | 2018-11-02 16:59:19.000
90c878... | [22345...,...] | 2018-11-03 16:59:19.000
b559c2... | [32345...,...] | 2018-11-04 16:59:19.000
6feab3... | [42345...,...] | 2018-11-05 16:59:19.000

#### columns

- batch_id: string
- statechains: String
- finalized_at: Date

#### permissions
*read only*




