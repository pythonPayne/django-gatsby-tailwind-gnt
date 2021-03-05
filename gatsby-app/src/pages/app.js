import React from "react"
import { Router } from "@reach/router"
import { useSelector } from "react-redux"
import Private from "../components/Private"
import Layout from "../components/Layout"
import Register from "../components/Register"
import Activate from "../components/Activate"
import Login from "../components/Login"
import Todos from "../components/Todos"
import Sermons from "../components/Sermons"
import Sermon from "../components/Sermon"
import Profile from "../components/Profile"
import Logout from "../components/Logout"

const App = () => {
  const theme = useSelector(state => state.layout.theme)
  const dark = theme === 'dark'
  return (
    <Layout>      
      <Router>        
        <Register path="app/register" dark={dark} />
        <Activate path="app/activate/:activationID" />
        <Login path="app/login" dark={dark} />                
        <Private path="app" component={Profile} dark={dark} />
        <Private path="app/todos" component={Todos} dark={dark} />        
        <Private path="app/sermons" component={Sermons} dark={dark} />
        <Private path="app/sermons/:sermonID" component={Sermon} dark={dark} />        
        <Private path="app/logout" component={Logout} dark={dark} />        
      </Router>
    </Layout>
  )
}

export default App