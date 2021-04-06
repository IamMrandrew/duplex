import axios from 'axios'

const UserServices = {
  login: (data: any) => {
    return axios.post('/api/login', data, { withCredentials: true })
  },
  signup: (data: any) => {
    return axios.post('/api/signup', data, { withCredentials: true })
  },
}

export default UserServices
