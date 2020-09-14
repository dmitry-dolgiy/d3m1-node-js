import React from 'react'
import { parse } from 'query-string'
import { Route, Redirect, Switch, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from "./LoginPage";
import { isAuthenticated } from "../store/duck/authenticate";

const Auth = () => {
  const authenticated = useSelector(isAuthenticated)
  const { search } = useLocation()
  const { redirectTo = '/' } = parse(search)

  return (
    <>
      {authenticated && <Redirect to={redirectTo}/>}
      <Switch>
        <Route component={LoginPage} path="/auth/login"/>
        <Redirect exact from="/auth" to={authenticated ? '/' : '/auth/login'}/>
      </Switch>
    </>
  )
}

export default Auth