import axios from 'axios'

export const homePage = () => {
  return axios.get('/pictures')
}