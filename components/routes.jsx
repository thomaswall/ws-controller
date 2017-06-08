import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import Root from 'root'
import Viz from 'viz';
import Controller from 'controller';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={Root}>
			<Route path='/' component={Viz} />
			<Route path='/controller' component={Controller}></Route>
		</Route>
	</Router>
), document.getElementById('root'));
