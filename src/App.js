import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from "./helpers/history";

import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/Private/PrivateRoute';
import { HomePage } from './components/Private/HomePage/HomePage';
import { LoginPage } from './components/Public/LoginPage';
import { RegisterPage } from './components/Public/RegisterPage/RegisterPage';

class App extends Component{
  constructor(props) {
    super(props);

    history.listen((location, action) => {
        // clear alert on location change
        this.props.clearAlerts();
    });
}

render() {
  const { alert } = this.props;
  return (
      <div className="jumbotron">
          <div className="container">
              <div className="col-sm-8 col-sm-offset-2">
                  {alert.message &&
                      <div className={`alert ${alert.type}`}>{alert.message}</div>
                  }
                  <Router history={history}>
                      <Switch>
                          <PrivateRoute exact path="/" component={HomePage} />
                          <Route path="/login" component={LoginPage} />
                          <Route path="/register" component={RegisterPage} />
                          <Redirect from="*" to="/" />
                      </Switch>
                  </Router>
              </div>
          </div>
      </div>
  );
}
}

const mapStateToProps = state => {
  const { alert } = state;
    return { alert };
};

const mapDispatchToProps = dispatch => {
  return {
  clearAlerts: alertActions.clear
};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
