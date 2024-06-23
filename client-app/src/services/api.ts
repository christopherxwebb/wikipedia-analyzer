import axios from 'axios'

const API_BASE_URL = 'http://localhost:9000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
})

export const fetchData = async () => {
  try {
    const response = await api.get('/endpoint')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}