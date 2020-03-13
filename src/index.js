import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import PaperIdForm from './components/requestForm/paperid-form';
import ClientIdForm from './components/clientidForm/clientid-form';
import Auth from './components/authForm/auth';
import Home from './components/home/home';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/paperid' render={() => <PaperIdForm />} />
        <Route exact path='/clientid' render={() => <ClientIdForm />} />
        <Route exact path='/auth' render={() => <Auth />} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root'));
