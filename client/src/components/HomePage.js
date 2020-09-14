import React from 'react'
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getAccessToken } from "../store/duck/authenticate";

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
    return <Redirect to="/auth/login" />
  }

  return (
    <h1>
      hello
    </h1>
  );
}

export default HomePage;
