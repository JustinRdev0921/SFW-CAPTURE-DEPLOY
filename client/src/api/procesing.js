import axios from './axios'
//`apostrofes`

//const API = 'http://localhost:3000/api'


export const getAreasRequest = () => axios.get(`/areas`)
export const getGruposRequest = () => axios.get(`/grupos`)
export const getTiposDocRequest = () => axios.get(`/tiposdoc`)
/*
export const getAreasRequest = async () => {
    try {
      const response = await axios.get(`/areas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching areas:', error);
      return [];
    }
  };
  
  export const getGruposRequest = async () => {
    try {
      const response = await axios.get(`/grupos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching grupos:', error);
      return [];
    }
  };
  
  export const getTiposDocRequest = async () => {
    try {
      const response = await axios.get(`/tiposdoc`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tipos de documento:', error);
      return [];
    }
  };

*/
export const createProcesingRequest = (procesing) => axios.post(`/procesing`, procesing)
