import { TableColumns, TableRows, Histogram } from '../../components';
import btcIcon from '../../images/walletIcon.svg';
import txidIcon from '../../images/txid-icon.svg';
import swapIcon from '../../images/swap_icon-blue.svg';
import './index.css';

const Home = (props) => {

    return(
        <div className = "home-container">
            {props.summaryStatus === "fulfilled" && props.summaryData > 8 ?
                <TableRows title = {
                <div className = "icon-container"><img src = {btcIcon} alt = "summary-btc" /> Summary</div>
            } data = {props.summaryData} /> : null}
            <Histogram title = "Coin Liquidity"/>
            { props.txStatus === "fulfilled" && props.txData.length > 8 ? <TableColumns title = "Transactions" img = {txidIcon} data = { props.txData.slice(-7,-1) } home/> : null }
            { props.batchStatus === "fulfilled" && props.batchData.length > 8 ? <TableColumns title = "Batch Transfers" img = {swapIcon} data = { props.batchData.slice(-7,-1) } home /> : null }
        </div>
    )
}

export default Home;