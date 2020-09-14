import React from 'react'
import { CssBaseline, makeStyles } from '@material-ui/core';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage'

const useStyles = makeStyles(theme => ({
	page: {
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
}), { name: 'App' });

const App = () => {
	const classes = useStyles();
	
	return (
		<>
			<CssBaseline/>
			<BrowserRouter>
				<div className={classes.page}>
					<Switch>
						{/*<Route*/}
						{/*	component={RegistrationPage}*/}
						{/*	path="/403"*/}
						{/*/>*/}
						<Route
							component={AuthPage}
							path="/auth/login"
						/>
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
