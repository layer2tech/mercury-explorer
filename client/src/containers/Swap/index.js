import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allBatchSelector, loadBatchTx, fromSatoshi } from '../../store/features/dataSlice';

import { ContainerTitle, EmptySearch, TableRows } from '../../components';
import { Link } from 'react-router-dom';
import './index.css';

const Swap = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [refresh,setRefresh] = useState()

    let batch_id = props.match.params.id
    const batchData = useSelector(state => state.data.batch_id_data)
    const batchList = useSelector(state => state.data.batch_id_list)
    const batchStatus = useSelector(state => state.data.batch_id_status)
    const allBatchTx = useSelector(allBatchSelector)


    useEffect(()=> {
        if(!batchList.includes(batch_id)){
            if(batchStatus !== "pending") dispatch(loadBatchTx(batch_id))
            setRefresh()
        }
        else{

            setData(batchData[batchList.indexOf(batch_id)])
            
        }
    },[data,batchStatus,batch_id,dispatch])


    return(
        <div>
            { data.length !== 0 ?
            <div className = "Swap">
                <ContainerTitle title = {batch_id} info = {`Swap Set: ${data.length}`} />
                {data.map(tx => {
                    let tableData = {
                        txid_vout: tx.txid_vout,
                        batch_id: tx.batch_id,
                        address: tx.address,
                        amount: fromSatoshi(tx.amount),
                        updated_at: tx.updated_at
                    }
                    // delete tableData.txid_vout
                    return(<TableRows 
                        title = {
                            <Link to = {`/tx/${tx.txid_vout}`}
                            className = "link tx-link">
                                {`TxID: ${tx.txid_vout}`}
                            </Link>}
                        data = {[tableData]} 
                        key= {tx.txid_vout}/>                    
                )})}
            </div> : <EmptySearch />}
        </div>
    )
}

export default Swap;