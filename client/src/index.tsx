import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import UserProvider from './context/UserContext'
import Routes from './Routes'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes />
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
