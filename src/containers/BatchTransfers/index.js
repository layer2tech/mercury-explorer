import { ContainerTitle,TableColumns } from '../../components';
import './index.css';

/*
Headers for Columns Table:
- batch_id
- length of statechains
- finalized_at    
*/

const data = [{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"}]

const BatchTransfers = (props) => {
    // GET array of Objects with keys listed above from statechains table
    return(
        <div className = "batch-transfers">
            <div>
                <TableColumns data = {data} title = "Batch Transfers"/>
            </div>
        </div>
    )
}

export default BatchTransfers;