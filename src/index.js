import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Views
import App from './views/main/App';

ReactDOM.render(
    <Provider>
        <Router>
            <MuiThemeProvider >
                <Switch>
                    <Route
                        exact path="/"
                        component={App}/>
                </Switch>
            </MuiThemeProvider>
        </Router>
    </Provider>, document.getElementById('root'));