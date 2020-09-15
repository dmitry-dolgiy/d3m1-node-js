import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SignInImage from '../../assets/signin-image.jpg'
import InputAdornment from "@material-ui/core/InputAdornment";
import { Person, Lock } from '@material-ui/icons';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { getIsLoading, loginUser, registerUser } from "../../store/duck/authenticate"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    overflow: 'scroll',
    height: '100vh',
    minHeight: 200,
  },
  loginContainer: {
    width: 900,
    height: 600,
  },
  paper: {
    borderRadius: 20,
  },
  formContainer: {
    margin: theme.spacing(10, 10, 0, 0),
    maxWidth: 350,
  },
  imgContainer: {
    margin: theme.spacing(10, 0, 0, 10),
  },
  icon: {
    cursor: 'pointer',
    width: 19,
    height: 19,
  },
  field: {
    marginBottom: theme.spacing(6),
  },
  loginButton: {
    minWidth: 160,
    height: 50,
    backgroundColor: '#6dabe4'
  },
  loginHeader: {
    fontWeight: 'bold',
    marginBottom: 25,
  },
  accountContainer: {
    paddingLeft: 55,
  }
}), { name: 'AuthPage' });

const LoginPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLoading = useSelector(getIsLoading)

  const [form, setForm] = useState({ email: '', password: '' })
  const handleOnChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value })

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Paper elevation={3} className={classes.paper}>
        <Grid className={classes.loginContainer} container>
          <Grid container item md className={classes.imgContainer}>
            <img src={SignInImage}/>
            <Grid className={classes.accountContainer} container alignItems="center">
              <Link to="/register">Create an account</Link>
            </Grid>
          </Grid>
          <Grid container item md className={classes.formContainer} direction="column">
            <Typography className={classes.loginHeader} variant="h1">Sign in</Typography>

            <FormControl fullWidth className={classes.field}>
              <Input
                placeholder='Login'
                id="login-input"
                name="email"
                onChange={handleOnChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Person className={classes.icon}/>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth className={classes.field}>
              <Input
                type="password"
                placeholder='Password'
                id="password"
                name="password"
                onChange={handleOnChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock className={classes.icon}/>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Grid container item justify="space-between">
              <Button
                disabled={isLoading}
                className={classes.loginButton}
                variant="contained"
                color="primary"
                onClick={() => dispatch(loginUser(form))}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
