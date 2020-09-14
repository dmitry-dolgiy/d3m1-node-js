import axios from 'axios';
import { ApiError } from '../utils/errorTypes';

export const getAPIPath = (path) => `/api/${path}`;

let TOKEN = ''
let TOKEN_TYPE = null

export const setToken = (accessToken, tokenType) => {
  document.cookie = `JWT=${accessToken}; path=/; max-age=5`
  TOKEN = accessToken
  TOKEN_TYPE = tokenType
}

export const request = (path, params = {}, auth = true) => {
  const requestParameters = auth
    ? {
      ...params,
      headers: {
        ...params.headers,
        Authorization: `${TOKEN_TYPE} ${TOKEN}`,
      }
    }
    : params

  return axios({ ...requestParameters, url: path })
    .then(({ data } = {}) => data)
    .catch(error => {
      throw new ApiError(error, 'src/api/index.js')
    })
}