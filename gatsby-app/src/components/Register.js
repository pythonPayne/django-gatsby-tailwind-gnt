import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { gql, useMutation } from '@apollo/client'
import Layout from './Layout'

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

const Register = ({dark}) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [errors, setErrors] = useState([])
  const [registerUser, { data }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => console.log("data: ", data),
    onError: (err) => console.log("error: ", err)
  })

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
            <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
            <input className={inputClass} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            <input className={inputClass} type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="password" />
            <input className={inputClass} type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="password again" />                
            <button 
              className={`focus:outline-none px-2 py-1 w-full text-gray-700 font-thin tracking-wide
                         bg-gray-200 bg-opacity-60 hover:bg-gray-100 rounded-lg 
              ${dark && "bg-gray-700 hover:bg-gray-600 text-blue-300 rounded-lg"}`}
              type="submit">Register</button>
            <p className={`text-center text-sm italic text-blue-400`}
              onClick={() => navigate("/app/login")}>Already have an account?</p>
            </form>
        </div>
    </Layout>
  )
}

export default Register