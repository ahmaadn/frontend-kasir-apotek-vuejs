import axios from 'axios'
import { getToken } from '@/lib/auth'

const request = axios.create({
   baseURL: import.meta.env.VITE_APP_API_URL,
   // withCredentials: true, // send cookies when cross-domain requests
   timeout: 100000,
})

// request interceptor
request.interceptors.request.use(
   (config) => {
      // lalukan setuatu sebelum request
      const hasToken = getToken()
      if (hasToken) {
         // simpan token
         config.headers['Authorization'] = `Bearer ${hasToken}`
      }
      config.headers['Access-Control-Allow-Origin'] = '*'
      return config
   },
   (error) => {
      // lakukan sesuatu jika terjadi kesalahan
      console.error(error)
      return Promise.reject(error)
   },
)

// response interceptor
request.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      console.error(error)
      return Promise.reject(error)
   },
)

export default request
