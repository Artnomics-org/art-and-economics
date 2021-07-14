import axios from 'axios'
import { getCookie } from '../utils/cookie'

const backendClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  timeout: 1000 * 60,
  headers: {},
  withCredentials: false,
})

const mockClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000 * 60,
  headers: {},
  withCredentials: false,
})

const localClient = axios.create({
  baseURL: 'http://localhost:3688',
  timeout: 1000 * 60,
  headers: {},
  withCredentials: false,
})

localClient.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

const localFetcher = (url: string): Promise<unknown> => localClient.get(url).then((res) => res.data)

backendClient.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

backendClient.interceptors.response.use(
  (response) => {
    // if(loadingInstance) loadingInstance.close();
    return response
  },
  (error) => {
    // loadingInstance.close()
    console.log(error.message)
    if (error.message.includes('status code 401')) {
      console.error('Login error')
    }
    if (error.message.includes('timeout')) {
      console.log('Request timeout')
    }
    if (error.message.includes('Network Error')) {
      console.error('Network Error')
    }
    return Promise.reject(error)
  },
)

export default backendClient
export { backendClient, mockClient, localClient, localFetcher }
