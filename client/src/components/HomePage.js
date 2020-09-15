import React from 'react'
import { makeStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  page: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}), { name: 'HomePage' });

const HomePage = () => {

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
