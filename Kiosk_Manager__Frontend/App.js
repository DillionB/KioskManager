import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import SigninPage from './pages/signin';
import RegisterPage from './pages/register';
import AdminPage from './pages/admin';
import UserPage from './pages/user';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={SigninPage} exact />
        <Route path='/register' component={RegisterPage} exact />
         <Route path='/Admin' component={AdminPage} exact />
              <Route path='/User' component={UserPage} exact />
             
      </Switch>
    </Router>
  );
}

export default App;
