import axios from 'axios'

const instance  = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

export const postAnswer = (answer: string) => instance('/question', {
  method: 'post',
  data: {
    answer
  },
})

export const getQuestion = () => instance('/question', {
  method: 'get',
})

export const getResults = () => instance(`/results`, {
  method: 'get',
})
