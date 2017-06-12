import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import Root from 'root'
import Controller from 'controller';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={Root}>
			<Route path='/' component={Controller} />
		</Route>
	</Router>
), document.getElementById('root'));
