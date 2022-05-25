import axios from 'axios'

export const allNews = () => {
  return axios.get('/newsArray')
}

export const oneNews = (id) => {
  return axios.get('/newsArray/'+id)
}

export const getPic = (id) => {
  return axios.get('/pictures/'+id)
}

export const addPic = (data) => {
  return axios.post('/pictures', data)
}

export const createNews = (data) => {
  return axios.post('/newsArray', data)
}




export const uploadPic = (data) => {
  // console.log(data);
  return axios.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}