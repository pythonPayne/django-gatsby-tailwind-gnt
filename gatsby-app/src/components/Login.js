import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { refreshUser } from '../redux/actions/auth'
import { navigate } from 'gatsby'

const TOKEN_AUTH = gql`
  mutation TOKEN_AUTH($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password) {
      success
      errors      
      refreshToken      
    }
  }
`
const REFRESH_TOKEN = gql`
mutation REFRESH_TOKEN($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken){
      token
      payload
      success
      errors
      refreshToken
    }
  }
`

const Login = ({ dark }) => {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [tokenMutation] = useMutation(REFRESH_TOKEN, {        
    onCompleted: (data) => {dispatch(refreshUser({
      username: data.refreshToken.payload.username,
      token: data.refreshToken.token,
      refreshToken: data.refreshToken.refreshToken,
      exp: data.refreshToken.payload.exp,
      origIat: data.refreshToken.payload.origIat
    }))    
    navigate("/app")
    },
    onError: (error) => console.error("Error refreshing token:", error),
  })  
  const [tokenAuth] = useMutation(TOKEN_AUTH, {
    onCompleted: (data2) => tokenMutation({variables: {refreshToken: data2.tokenAuth.refreshToken}})
  })
  
  const handleFormSubmit = (e) => {
      e.preventDefault()
      tokenAuth({ variables: {username, password} })      
  }
  
  const inputClass = `border-b-2 focus:outline-none p-2 text-center
  border-gray-300 bg-gray-50 text-blue-400 placeholder-gray-400 placeholder-opacity-50
${dark && "border-gray-900 bg-gray-800 text-blue-400 placeholder-gray-400 placeholder-opacity-50"}`

  return (
    <Layout>      
        <div className={`flex justify-center`}>
            <form 
              className={`flex flex-col pt-12 space-y-5 w-1/2 max-w-xs
              ${dark && 'bg-gray-800'}`}
              onSubmit={(e) => handleFormSubmit(e)}>            
              <input className={inputClass}
              type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"
              />
              <input className={inputClass}
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"
              />            
              <button 
              className={`focus:outline-none px-2 py-1 w-full text-gray-700 font-thin tracking-wide
                         bg-gray-200 bg-opacity-60 hover:bg-gray-100 rounded-lg 
              ${dark && "bg-gray-700 hover:bg-gray-600 text-blue-300 rounded-lg"}`}
              type="submit">Login</button>
              <p className={`text-center text-sm italic text-blue-400`} 
              onClick={() => navigate("/app/register")}>Need an account?</p>
            </form>
            
        </div>
    </Layout>
  )
}

export default Login