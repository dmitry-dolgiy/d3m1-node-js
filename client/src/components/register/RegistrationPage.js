import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import RegistrationImage from '../../assets/signup-image.jpg'
import InputAdornment from "@material-ui/core/InputAdornment";
import { Person, Lock, Email, EnhancedEncryption } from '@material-ui/icons';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import {
  getCurrentUserId,
  getIsLoading,
  isAuthenticated,
  logout,
  registerUser
} from "../../store/duck/authenticate"
import FormHelperText from "@material-ui/core/FormHelperText";

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
    maxWidth: 350,
    margin: theme.spacing(10, 0, 0, 10),
  },
  imgContainer: {
    margin: theme.spacing(4, 0, 0, 10),
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
    paddingTop: 50,
  },
  confirmHelper: {
    color: '#f44336',
    fontSize: 12,
  }
}), { name: 'AuthPage' });

const RegistrationPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUserId = useSelector(getCurrentUserId)
  const isLoading = useSelector(getIsLoading)
  const authenticated = useSelector(isAuthenticated)
  const [form, setForm] = useState({})
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false)

  const isMatchPasswords = form.password === form.confirmPassword

  useEffect(() => {
    if (isMatchPasswords) {
      setHasConfirmPasswordError(false)
    } else {
      setHasConfirmPasswordError(true)
    }
  }, [form.confirmPassword])

  useEffect(() => {
    if (currentUserId) {
      history.push('/auth/login')
    }
  }, [currentUserId, history])

  useEffect(() => {
    if (authenticated) {
      dispatch(logout())
    }
    // it should work only after first open. So, empty dependencies list is expected here.
  }, [])

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
          <Grid container item md className={classes.formContainer} direction="column">
            <Typography className={classes.loginHeader} variant="h1">Sign up</Typography>
            <FormControl fullWidth className={classes.field}>
              <Input
                placeholder='Your name'
                name="name"
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
                placeholder='Your Email'
                name="email"
                onChange={handleOnChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Email className={classes.icon}/>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth className={classes.field}>
              <Input
                error={hasConfirmPasswordError}
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

            <FormControl fullWidth className={classes.field}>
              <Input
                error={hasConfirmPasswordError}
                label='Enter correct password'
                type="password"
                placeholder='Repeat your password'
                name="confirmPassword"
                onChange={handleOnChange}
                startAdornment={
                  <InputAdornment position="start">
                    <EnhancedEncryption className={classes.icon}/>
                  </InputAdornment>
                }
              />
              {hasConfirmPasswordError && (
                <FormHelperText
                  className={classes.confirmHelper}
                >
                  Passwords does not match
                </FormHelperText>
              )}
            </FormControl>

            <Grid container item justify="space-between">
              <Button
                disabled={isLoading}
                className={classes.loginButton}
                variant="contained"
                color="primary"
                onClick={() => dispatch(registerUser(form))}
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container item md className={classes.imgContainer}>
            <img src={RegistrationImage}/>
            <Grid className={classes.accountContainer} container>
              <Link to="/auth/login">I am already member</Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegistrationPage;
