import { ContainerTitle, TableRows } from '../../components';
import { Link } from 'react-router-dom';
import './index.css';

/*

Batch Id  ------- Number of coins in swap? (Length of statechains array)
TXiD as link?:
    - address
    - amount
    - inserted_at
    - Txid:vout
*/

const batch_data = {batch_id: "012312dad3rwf32rg", statechains: [12345,32493,32432,23432], finalized_at: "2018-11-02 16:59:19.000"}

const data = [{txid_vout: "032rjfvnjsfwjkeoriwe", address: "sc1rewtsdfsdsdf",
    amount: 10000, inserted_at: "2018-11-02 16:39:19.000"},
    {txid_vout: "032rjfvnjsfwjkeoriwe", address: "sc1rewtsdfsdsdf",
    amount: 10000, inserted_at: "2018-11-02 16:39:19.000"},
    {txid_vout: "032rjfvnjsfwjkeoriwe", address: "sc1rewtsdfsdsdf",
    amount: 10000, inserted_at: "2018-11-02 16:39:19.000"},
    {txid_vout: "032rjfvnjsfwjkeoriwe", address: "sc1rewtsdfsdsdf",
    amount: 10000, inserted_at: "2018-11-02 16:39:19.000"}]

const Swap = (props) => {
    // GET corresponding batch_id from URL
    let batch_id = props.match.params.id
    // iterate through statechains list and get each TxID associated data
    // Need Redux function that returns data as above from batch_id
    return(
        <div className = "Swap">
            <ContainerTitle title = {batch_data.batch_id} data = {`Transactions/Swap Size: ${batch_data.statechains.length}`} />
            {data.map(tx => {
                let tableData = tx
                // delete tableData.txid_vout
                return(<TableRows 
                    title = {
                        <Link to = {`/tx/${tx.txid_vout}`}
                        className = "link tx-link">
                            {`TxID: ${tx.txid_vout}`}
                        </Link>}
                    data = {[tableData]} />                    
            )})}
        </div>
    )
}

export default Swap;