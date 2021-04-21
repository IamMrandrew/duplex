import axios from 'axios'

const ChatServices = {
  getChats: () => {
    return axios.get('/api/chat', { withCredentials: true })
  },

  createChat: (data: any) => {
    return axios.post('/api/chat', data, { withCredentials: true })
  },

  joinChat: ( chatId:string ) => {
    return axios.get(`/api/chat/${chatId}`, { withCredentials: true })
  },
}

export default ChatServices
