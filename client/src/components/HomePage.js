import React from 'react'
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getAccessToken } from "../store/duck/authenticate";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  page: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}), { name: 'HomePage' });

const HomePage = () => {
  const token = useSelector(getAccessToken)

  if (!token) {
    return <Redirect to="/auth/login"/>
  }

  return (
    <Grid container alignItems="center" justify="center">
      <h1>
        Hello, GUYS!
      </h1>
      <h3>Currently this page is in development mode</h3>
    </Grid>
  );
}

export default HomePage;
