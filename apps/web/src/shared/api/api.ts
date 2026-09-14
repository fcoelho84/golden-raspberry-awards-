import axios, { type AxiosRequestConfig, type Method } from 'axios'

const base = axios.create({
  baseURL: 'https://challenge.outsera.tech/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const baseRequest = <Response = any>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig,
) =>
  base.request<Response>({
    method,
    url,
    ...config,
  })

export const GET = <Response = any>(
  url: string,
  config?: AxiosRequestConfig,
) => {
  return baseRequest<Response>('GET', url, config)
}
