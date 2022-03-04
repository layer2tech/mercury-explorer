import { useSelector } from 'react-redux';

import { ContainerTitle,TableColumns } from '../../components';

import { allBatchSelector, allBatchStatus } from '../../store/features/dataSlice';
import swapIcon from '../../images/swap_icon-blue.svg';
import './index.css';

/*
Headers for Columns Table:
- batch_id
- length of statechains
- finalized_at    
*/

const BatchTransfers = (props) => {
    const batchData = useSelector(allBatchSelector)
    const batchStatus = useSelector(allBatchStatus)
    // GET array of Objects with keys listed above from statechains table
    return(
        <div className = "batch-transfers">
            <div>
                { batchStatus === "fulfilled" && batchData.length > 0 ? <TableColumns data = {batchData} title = "Batch Transfers" img = {swapIcon}/> : null }
            </div>
        </div>
    )
}

export default BatchTransfers;