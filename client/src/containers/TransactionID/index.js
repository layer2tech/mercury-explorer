import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTx, fromSatoshi } from '../../store/features/dataSlice';

import { ContainerTitle,EmptySearch,TableRows } from '../../components';
import './index.css';
import arrow from '../../images/arrow-up-white.svg';

import {bech32} from 'bech32';

/*
Header = TxId:vout
    - Amount
    - txid
    - Event
    - Expiry block height/ time?
    - Confirmed
    - updated_at
    - chain

Statechain --- TxID: txid:vout
    For each item in statechain array:
    - Event
    - txid (Convert txid from Proof Key (data))
*/

const TransactionID = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [chain, setChain] = useState([])
    const [refresh,setRefresh] = useState()

    let txid = props.match.params.id
    const txidData = useSelector(state => state.data.txid_data)
    const txidList = useSelector(state => state.data.txid_list)
    const txidStatus = useSelector(state => state.data.txid_status)

    useEffect(()=> {
        if(!txidList.includes(txid)){
            if(txidStatus !== "pending") dispatch(loadTx(txid))
            setRefresh()
        }
        else{

            setData(txidData[txidList.indexOf(txid)])
            
        }
    },[data,chain,txidStatus,txid,dispatch])

    // Bech32 encode SCEAddress (StateChain Entity Address)
    const encodeSCEAddress = (proof_key) => {
        let words = bech32.toWords(Buffer.from(proof_key, 'hex'))
        return bech32.encode('tc', words)
    }
    

    return(
        <div className='txid'>

        {data.length !== 0 ?
            <div className = "address">
                <ContainerTitle title = {`TRANSACTION ID `} info = {  txid }  />
                <div>
                    {/* Change data to a props attribute */}
                    {data.map(item => {
                        let dataResults = {
                            address: item.address,
                            event: item.event,
                            amount: fromSatoshi(item.amount),
                            locktime: item.locktime,
                            confirmed: item.confirmed,
                            updated_at: item.updated_at
                        }
                        return (<TableRows data = {[dataResults]} key = {item.id} title = {`EVENT: ${item.event}`} />)
                    })}
                </div>
                <div className = "table-component-holder txid-page">
                    <div className = "table-container">
                        <ContainerTitle title = "STATECHAIN" />
                        { data.length > 0 ?
                            data[0].chain.map(item => {
                                let address
                                let event
                                if(item.next_state?.data !== undefined){
                                    address = encodeSCEAddress(item.next_state.data)
                                    event = item.next_state.purpose
                                }
                                else{
                                    address = encodeSCEAddress(item.data)
                                    event = "FINAL"
                                }

                                let tableData = {address: address, event: event}
                                return (
                                <div>
                                    <TableRows data = {[tableData]} />
                                    <img src = {arrow} alt = "next-chain" className = "arrow"/>
                                </div>
                                )
                        }) : null}
                    </div>
                </div>
            </div> : <EmptySearch />}
        </div>
    )
}

export default TransactionID;