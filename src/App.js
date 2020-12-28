import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Manage from './Components/Manage/Manage';
import NotFound from './Components/NotFound/NotFound';
import Details from './Components/Details/Details';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3>Email:{loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
            </Route>

            <Route path="/review">
              <Review></Review>
            </Route>

            <PrivateRoute path="/manage">
              <Manage></Manage>
            </PrivateRoute>

            <Route  exact path="/">
          <Shop></Shop>
            </Route>

            <Route path="/product/:productKey">
            <Details></Details>
            </Route>

            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="*">
          <NotFound></NotFound>
            </Route>
        </Switch>
      </Router>
        
        
        
    </UserContext.Provider>
  );
}

export default App;
