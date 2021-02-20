import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Layout from '../components/Layout'

const REGISTER_USER = gql`
  mutation REGISTER_USER($email: String!, $username: String!, $password1: String!, $password2: String!){
    register(
      email: $email,
      username: $username,
      password1: $password1,
      password2: $password2,
    ) {
      success
      errors
    }
  }
`

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [registerUser, { data }] = useMutation(REGISTER_USER);

 useEffect(() => {          
     if (data && data.register.success) {
        setEmail('')
        setUsername('')
        setPassword1('')
        setPassword2('')
      }
     return () => {
         console.log('cleaning...')
     }
 }, [data])

  const handleFormSubmit = (e) => {
      e.preventDefault()
      registerUser({ variables: {
          email, username, password1, password2
      }})
      
  }
  
  return (
    <Layout>      
        <div>
            <form onSubmit={(e) => handleFormSubmit(e)} className={`flex flex-col`}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`border border-black`}/>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`border border-black`}/>
            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} className={`border border-black`}/>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className={`border border-black`}/>                
            <button type="submit" className={`border border-black`}>Register</button>
            </form>
        </div>
    </Layout>
  )
}

export default Register