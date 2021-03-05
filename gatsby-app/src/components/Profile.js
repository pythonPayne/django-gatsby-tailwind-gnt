import React from 'react'
import { Link } from 'gatsby'
import Layout from './Layout'
import { StaticImage } from "gatsby-plugin-image"

const Profile = ({dark}) => {
  
  return (
      <Layout>
        {/* <StaticImage src="../images/bird1.jpg" alt="A bird" /> */}        
        <StaticImage 
          src="http://localhost:5000/static/bird1.jpg" alt="a bird"
          placeholder="blurred"
          layout="constrained" />        
        <div className={`fixed w-full px-2 bottom-0 h-10 bg-gray-50 text-green-400 text-xl border-t flex justify-around items-center
        ${dark && "bg-gray-900 border-none"}`}>
          <div><Link to="/app/todos">Todos</Link></div>
          <div><Link to="/app/sermons">Sermons</Link></div>
          <div><Link to="/app">Profile</Link></div>          
        </div>
      </Layout>
  )
}

export default Profile
