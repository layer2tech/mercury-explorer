import { useSelector } from 'react-redux';

import { ContainerTitle,TableColumns } from '../../components';

import { allBatchSelector, allBatchStatus, batchByDateSelector } from '../../store/features/dataSlice';
import swapIcon from '../../images/swap_icon-blue.svg';
import './index.css';
import { useEffect, useState } from 'react';

/*
Headers for Columns Table:
- batch_id
- length of statechains
- finalized_at    
*/

const BatchTransfersDate = (props) => {
    const batchData = useSelector(batchByDateSelector)
    const batchStatus = useSelector(allBatchStatus)
    // GET array of Objects with keys listed above from statechains table
    const [data,setData] = useState([])
    useEffect(()=> {
        let date = props.match.params.id

        batchData.map(day => {
            if(day.date === date && data.length === 0){
                setData(day.date_data)
            }
        })
    },[data])

    return(
        <div className = "batch-transfers">
            <div>
                { batchStatus === "fulfilled" && data.length > 0 ? <TableColumns data = {data} title = {`Batch Transfers - ${props.match.params.id}`} img = {swapIcon}/> : null }
            </div>
        </div>
    )
}

export default BatchTransfersDate;