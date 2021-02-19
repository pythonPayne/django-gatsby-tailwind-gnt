import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Activate from "../components/Activate"

const App = () => {
  return (
    <Layout>
      <Router>        
        <Activate path="app/activate/:activationID" />
      </Router>
    </Layout>
  )
}
export default App