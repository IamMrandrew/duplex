import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import SettingProvider from './contexts/SettingContext'
import UserProvider from './contexts/UserContext'
import Routes from './Routes'

ReactDOM.render(
  <React.StrictMode>
    <SettingProvider>
      <UserProvider>
        <Router>
          <Routes />
        </Router>
      </UserProvider>
    </SettingProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)