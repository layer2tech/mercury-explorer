import { TableColumns, TableRows, Histogram } from '../../components';
import btcIcon from '../../images/walletIcon.svg';
import txidIcon from '../../images/txid-icon.svg';
import swapIcon from '../../images/swap_icon-blue.svg';
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
            <TableRows title = {
                <div className = "icon-container"><img src = {btcIcon} alt = "summary-btc" /> Summary</div>
            } data = {data_summary}/>
            <Histogram title = "Coin Liquidity"/>
            <TableColumns title = {
                <div className = "icon-container txid"><img src = {txidIcon} alt = "Transactions"/> Transactions</div>
            } data = {data_tx.slice(0,4)}/>
            <TableColumns title = {
                <div className = "icon-container"><img src = {swapIcon} alt = "Batch Transfers"/> Batch Transfers</div>
            } data = {data_batch.slice(0,4)}/>
        </div>
    )
}

export default Home;