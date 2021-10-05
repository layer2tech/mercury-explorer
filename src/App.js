import './App.css';
import {Router, Switch, Route,Redirect} from 'react-router-dom';
import { TopNavigation, Home, Swap, ScAddress, Transaction } from './containers';
import { TableRows } from './components';
import {routes} from './routes';
import appHistory from './app.history';

// Mainstay adds: <Router history={appHistory} />

function App() {
  return (
    <Router history = {appHistory} >
      <div className = "App">
        <TopNavigation />
        <div className = "main">
          <TableRows />
          
          <Switch>
            <Route path = {routes.transaction} component = {Transaction} />
            <Route path = {routes.swap} component = {Swap} />
            <Route path = {routes.sc_address} component = {ScAddress} />
            <Route exact path = {routes.app} component = {Home} />
            <Redirect from = "*" to = {routes.app} component = {Home}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
