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
  updateProfile: (data: any) => {
    return axios.put('/api/user', data, { withCredentials: true })
  },
  signS3: (data:any) => {
    return axios.post('/api/sign-s3', data, {withCredentials: true})
  },
  uploadProfilePicture: (file: File, url: string) => {
    return axios.put(url, file, {headers: { 'Content-Type': file.type, acl: 'public-read' }})
  }
}

export default UserService
