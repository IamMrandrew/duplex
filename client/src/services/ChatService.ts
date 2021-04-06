import axios from 'axios'

const ChatServices = {
  getChats: () => {
    return axios.get('/api/chat', { withCredentials: true })
  },

  createChat: (data: any) => {
    return axios.post('/api/login', data, { withCredentials: true })
  },

  joinChat: (data: any) => {
    return axios.post('/api/signup', data, { withCredentials: true })
  },
}

export default ChatServices
