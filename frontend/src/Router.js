import React from 'react'
import { Route, Switch ,Redirect} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

const Routes = () => (
  <main>
     <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage}>
          { sessionStorage.getItem('state') ? <Redirect to="/" /> : undefined }
          </Route>
        <Route path="/profile" component={Profile}>
        { !sessionStorage.getItem('state') ? <Redirect to="/login" /> : undefined }
        </Route>
        <Route component={Error} />
      </Switch>
  </main>
)

export default Routes;