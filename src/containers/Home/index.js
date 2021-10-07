import { TableColumns, TableRows, Histogram } from '../../components';
import './index.css';

const data_summary = [{Total_Coins: 520, Total_Swapped: 401, Total_Value: "3.9 BTC", Total_Withdrawn:"2 BTC",
Total_Transfers: 360}]

const data_tx = [{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"}]

const data_batch = [{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"},
{batch_id: "12323fsef2334", statechains: [1,2,3,45], finalized_at: "00:00:00 1/21/11"}]

const Home = () => {

    return(
        <div className = "home-container">
            <TableRows title = "Summary" data = {data_summary}/>
            <Histogram title = "Coin Liquidity"/>
            <TableColumns title = "Transactions" data = {data_tx.slice(0,4)}/>
            <TableColumns title = "Batch Transfers" data = {data_batch.slice(0,4)}/>
        </div>
    )
}

export default Home;