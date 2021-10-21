import { ContainerTitle,TableColumns } from '../../components';
import { useSelector } from 'react-redux';
import './index.css';
import txidIcon from '../../images/txid-icon.svg';
import { allTxSelector, allTxStatus } from '../../store/features/dataSlice';

const Transactions = (props) => {
    const txData = useSelector(allTxSelector)
    const txStatus = useSelector(allTxStatus)
    // GET array of Objects with keys listed above from transactions table

    return(
    <div className = "transactions">
        <div>
            {txStatus === "fulfilled" ? <TableColumns data = {txData} title = "Transactions" img={txidIcon}/> : null}
        </div>
    </div>
    )
}

export default Transactions;