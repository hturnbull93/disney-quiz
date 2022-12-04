import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.disneyapi.dev',
})

export const getCharactersByPage = (page) => instance(`/characters?page=${page}`, {
  method: 'get',
})
