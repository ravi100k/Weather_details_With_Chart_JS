import React from 'react';
import ReactDOM from 'react-dom';
var Route = require('react-router').Route;
var Router = require('react-router').Router;
var {browserHistory,hashHistory} = require ('react-router');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Main from './components/Main.jsx';

ReactDOM.render(
<MuiThemeProvider>
  <Router history={browserHistory}>
		<Route path="/" component={Main}>
		</Route>
	</Router>
  </MuiThemeProvider>,

  document.getElementById('app')
);
