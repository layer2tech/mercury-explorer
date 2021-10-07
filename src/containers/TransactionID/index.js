import { ContainerTitle,TableRows } from '../../components';
import './index.css';
import arrow from '../../images/arrow-up-white.svg';

import {bech32} from 'bech32';

/*
Header = TxId:vout
    - Amount
    - Address
    - Event
    - Expiry block height/ time?
    - Confirmed
    - updated_at

Statechain --- TxID: txid:vout
    For each item in statechain array:
    - Event
    - Address (Convert address from Proof Key (data))
*/

/**
 * Chain in format:
 * [{address: 02fajfw, event: Transfer}, {
 *  address: 03aefferfgwr, event: Transfer},
 *  address: tb1qfwe43irkj4, event: Withdraw]
 */

const data = [{txid_vout: "d3kjqhrkjq3jrbkj2:1", address: "sc1jkqj3ebjq3ekeqdd", event: "Transfer",
    block_expiry: 942342, confirmed: true, updated_at: "01/12/2020 05:35:21"}]

const chain = [{"data":"0244ba23a5fa78b0b388e021e084b7fad0262f06c092192469f521cdedeb3e7cfa","next_state":{"purpose":"TRANSFER","data":"038eac439660f3c582a205657f53919a9c3f556ab00ff83a8bdb2e9b2522f2d97c","sig":"3045022100b71cc17050811360162d9e105c0ccbf979e6dab6fe6d81e503d5b4b8af1ab61d02202b0b1204cb502753a5b6671d914973a73b5e2871114ab3baef359314d23069bc"}},
{"data":"038eac439660f3c582a205657f53919a9c3f556ab00ff83a8bdb2e9b2522f2d97c","next_state":{"purpose":"TRANSFER","data":"02a71f50801016dc67be1962cf063da720590ef43a587b2774b45afcfcc0646962","sig":"30450221009b5d686ea40e8d1564811206e042db87522dbd734048b9b6f27e18621073006d02207f3c607f684455601b793d858fadb5ef8d76cc31402e4093fa8e5888fca83bf4"}},
{"data":"02a71f50801016dc67be1962cf063da720590ef43a587b2774b45afcfcc0646962","next_state":{"purpose":"TRANSFER","data":"02038ce746cf674be2daeb18d5595554fbec372ac5ff0d38f5f85ae4f9d99d65e3","sig":"3045022100cbc73c8cb3f67bd02f8faa50fdf36f04bff3ec88dbac8d3471b39a4f6e5f8ca302202e83d3e248081eec1c13d6d0eec7e5f0df65221ef1052be1e6ea2b1fc0449714"}},{"data":"02038ce746cf674be2daeb18d5595554fbec372ac5ff0d38f5f85ae4f9d99d65e3","next_state":null}]


const TransactionID = (props) => {
    let txid = props.match.params.id

    // Bech32 encode SCEAddress (StateChain Entity Address)
    const encodeSCEAddress = (proof_key) => {
        let words = bech32.toWords(Buffer.from(proof_key, 'hex'))
        return bech32.encode('sc', words)
    }
    return(
        <div className = "address">
            <ContainerTitle title = {`Transaction ID: ${txid}`}  />
            <div>
                {/* Change data to a props attribute */}
                {data.map(item => {
                    let details = item
                    delete details.txid_vout
                    return (<TableRows data = {[details]} title = {`Event: ${item.event}`} />)
                })}
            </div>
            <div className = "table-component-holder txid-page">
                <div className = "table-container">
                    <ContainerTitle title = "Statechain" />
                    {chain.map(item => {
                        let address
                        let event
                        if(item.next_state?.data !== undefined){
                            address = encodeSCEAddress(item.next_state.data)
                            event = item.next_state.purpose
                        }
                        else{
                            address = item.data
                            event = "FINAL"
                        }

                        let tableData = {address: address, event: event}
                        return (
                        <div>
                            <TableRows data = {[tableData]} />
                            <img src = {arrow} alt = "next-chain" className = "arrow"/>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TransactionID;