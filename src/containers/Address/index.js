import { TableRows,ContainerTitle } from '../../components';
import './index.css';

/*
TITLE: address  ------------- Transactions: # of Tx

For each TxId, have a table of:
EVENT:
    - address
    - TxID:vout
    - amount
    - Event
    - block_expiry
    - confirmed
    - inserted_at

*/

const data = [{address: 'sc1qrifdfsdasd', txid_vout: 'dhaeiuhfiujh4iuy839:0', event: 'Transfer',amount: 0.001, block_expiry: 902143, confirmed: true
, inserted_at: "00:21:43:33"},{address: 'sc1qrifdfsdasd', txid_vout: 'dhaeiuhfiujh4iuy839:0', event: 'Transfer',amount: 0.001, block_expiry: 902143, confirmed: true
, inserted_at: "00:21:43:33"}]

const Address = (props) => {
    let address = props.match.params.id

    // Get data for address in format shown above
    
    return(
        <div className = "address">
            <ContainerTitle title = {address} info = {`Transactions: ${data.length}`} />
            <div>
                {/* Change data to a props attribute */}
                {data.map(item => {
                    delete item.sc_address
                    let event = item.event
                    delete item.event
                    return (<TableRows data = {[item]} title = {`Event: ${event}`} />)
                })}
            </div>
        </div>
    )
}

export default Address;