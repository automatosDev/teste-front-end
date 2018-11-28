import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Views
import App from './views/main/App';

ReactDOM.render(
        <Router>
            <MuiThemeProvider >
                <Switch>
                    <Route
                        exact path="/"
                        component={App}/>
                </Switch>
            </MuiThemeProvider>
        </Router>
    , document.getElementById('root'));