import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/actions/auth'
import Layout from '../components/Layout'

const TOKEN_AUTH = gql`
  mutation TOKEN_AUTH($username: String!, $password: String!){
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
  const [tokenAuth, { data }] = useMutation(TOKEN_AUTH);
  const dispatch = useDispatch()

 useEffect(() => {          
     if (data && data.tokenAuth.success) {        
        setUsername('')
        setPassword('')
        dispatch(loginUser({
          username: data.tokenAuth.user.username,
          token: data.tokenAuth.token,
          refreshToken: data.tokenAuth.refreshToken
        }))        
      }
     return () => {
         console.log('cleaning...')
     }
 }, [data, dispatch])

  const handleFormSubmit = (e) => {
      e.preventDefault()
      tokenAuth({ variables: {username, password} })      
  }
  
  return (
    <Layout>      
        <div>
            <form onSubmit={(e) => handleFormSubmit(e)} className={`flex flex-col`}>            
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`border border-black`}/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`border border-black`}/>            
            <button type="submit" className={`border border-black`}>Login</button>
            </form>
        </div>
    </Layout>
  )
}

export default Login