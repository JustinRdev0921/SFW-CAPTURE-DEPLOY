import axios from './axios'
//`apostrofes`

//const API = 'http://localhost:3000/api'

export const getUsersRequest = () => axios.get(`/users`)

export const getUserRequest = (id) => axios.get(`/users/${id}`)

export const createUserRequest = (user) => axios.post(`/users`, user)

export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user)

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`)

// Función para cargar un archivo al servidor
/*export const fileUploadRequest = (file) => {
    const formData = new FormData();
    formData.append('archivo', file);
  
    return axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };*/

  export const fileUploadRequest = (formData) => {
    return axios.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};



