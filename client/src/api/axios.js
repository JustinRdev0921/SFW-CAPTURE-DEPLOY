import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.80.29:7000/api',
    withCredentials: true,
})

export default instance