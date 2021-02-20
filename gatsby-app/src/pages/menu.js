import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const Menu = () => {
    return (
        <Layout>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/about">About</Link></div>
            <div><Link to="/register">Register</Link></div>
            <div><Link to="/login">Login</Link></div>
        </Layout>
    )
}

export default Menu
