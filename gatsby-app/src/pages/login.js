import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Layout from '../components/Layout'

const LOGIN_USER = gql`
  mutation LOGIN_USER($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password) {
      success
      errors
      unarchiving
      token
      refreshToken
      unarchiving
      user {
        id
        username
      }
    }
  }
`


const Login = () => {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const [loginUser, { data }] = useMutation(LOGIN_USER);

 useEffect(() => {
     console.log(data)
     // working!
     // next: configure storing username and token with redux
     if (data && data.tokenAuth.success) {        
        setUsername('')
        setPassword('')        
      }
     return () => {
         console.log('cleaning...')
     }
 }, [data])

  const handleFormSubmit = (e) => {
      e.preventDefault()
      loginUser({ variables: {username, password} })      
  }
  
  return (
    <Layout>      
        <div>
            <form onSubmit={(e) => handleFormSubmit(e)} className={`flex space-x-4`}>            
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`border border-black`}/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`border border-black`}/>            
            <button type="submit" className={`border border-black`}>Login</button>
            </form>
        </div>
    </Layout>
  )
}

export default Login