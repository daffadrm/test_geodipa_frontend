
import './App.css';

import {BrowserRouter,Route,Switch} from 'react-router-dom'


import Product from './components/product';
import User from './components/user';
import Transaction from './components/transaction';
import TambahProduct from './components/tambahProduct';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/product">
        <Product/>
      </Route>
      <Route path="/user">
        <User/>
      </Route>
      <Route path="/transaction">
        <Transaction/>
      </Route>
      <Route path="/tambahproduct">
        <TambahProduct/>
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
