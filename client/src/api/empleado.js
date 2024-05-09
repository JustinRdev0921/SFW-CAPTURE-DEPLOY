import axios from 'axios'
//`apostrofes`
const API = 'https://c7dd0c96-3610-438e-94f1-cced0b38af8c.mock.pstmn.io/codigo'

export const getEmpleadoRequest = (id) => axios.get(`${API}/${id}`)