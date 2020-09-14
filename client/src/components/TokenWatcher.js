import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getHasAuthorizationError } from '../store/duck/authenticate'
import { logout } from '../store/duck/authenticate'


const TokenWatcher = () => {
  const dispatch = useDispatch()
  const hasAuthorizationError = useSelector(getHasAuthorizationError)

  useEffect(() => {
    if (hasAuthorizationError) {
      dispatch(logout())
    }
  }, [hasAuthorizationError])

  return null
}

export default TokenWatcher