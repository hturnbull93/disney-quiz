import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001',
}

export const postAnswer = (id: number, answer: string) => axios(`/question/${id}`, {
  ...config,
  method: 'post',
  data: {
    answer
  },
})

export const getQuestion = (id: number) => axios(`/question/${id}`, {
  ...config,
  method: 'get',
})

export const getResults = () => axios(`/results`, {
  ...config,
  method: 'get',
})
