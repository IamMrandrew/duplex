import axios from 'axios'

const UserService = {
  login: (data: any) => {
    return axios.post('/api/login', data, { withCredentials: true })
  },
  signup: (data: any) => {
    return axios.post('/api/signup', data, { withCredentials: true })
  },
  logout: () => {
    return axios.post('/api/logout', { withCredentials: true })
  },
  getUser: () => {
    return axios.get('/api/user', { withCredentials: true })
  },
}

export default UserService
