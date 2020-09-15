import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { isAuthenticated, logout } from "../../store/duck/authenticate";
import RegistrationPage from "./RegistrationPage";


const Registration = ({ location: { search } }) => {
  const dispatch = useDispatch()
  const authenticated = useSelector(isAuthenticated)

  useEffect(() => {
    if (authenticated) {
      dispatch(logout())
    }
  }, [])

  return (
    <Switch>
      <Route exact component={RegistrationPage} path="/register" />
    </Switch>
  )
}

export default Registration
