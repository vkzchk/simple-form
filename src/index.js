import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './components/authForm/auth';
import RequestForm from './components/requestForm/requestForm';


ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path='/' render={() => <RequestForm />} />
        <Route path='/auth' render={() => <Auth />} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root'));


