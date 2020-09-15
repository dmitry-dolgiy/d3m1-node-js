import React from 'react'
import { CssBaseline, makeStyles } from '@material-ui/core';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from "./components/HomePage";
import Auth from "./components/auth/Auth";
import TokenWatcher from "./components/TokenWatcher";
import Registration from "./components/register/Registration";

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
            <Route component={Auth} path="/auth"/>
            <Route component={Registration} path="/register" />
            <Route component={HomePage} path="/"/>
          </Switch>
        </div>
        <TokenWatcher/>
      </BrowserRouter>
    </>
  );
}

export default App;
