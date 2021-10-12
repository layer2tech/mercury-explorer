import { ContainerTitle,TableColumns } from '../../components';
import './index.css';

/*
Headers for Columns Table:
- txid:vout
- address
- inserted_at
*/

const data = [{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"},
{txid_vout: "dasf4wr324e3rwe32:0", address: "sc1fsefwefgrgffer", inserted_at: "13:25:37 22/10/21"}]

const Transactions = (props) => {

    // GET array of Objects with keys listed above from transactions table

    return(
    <div className = "transactions">
        <div>
            <TableColumns data = {data} title = "Transactions"/>
        </div>
    </div>
    )
}

export default Transactions;