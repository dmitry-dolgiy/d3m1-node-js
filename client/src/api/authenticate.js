import { getAPIPath, request, setToken } from './core'

export const register = ({ email, password }) => request(
  getAPIPath('auth/register'),
  { method: 'POST', data: { email, password } },
  false,
)

export const login = ({ email, password }) => request(
  getAPIPath('auth/login'),
  { method: 'POST', data: { email, password } },
  false,
).then(data => {
  setToken(data.token, 'Bearer')
  return data
})