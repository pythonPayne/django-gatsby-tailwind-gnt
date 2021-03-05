import React, { useEffect } from "react"
import { gql, useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { refreshUser } from '../redux/actions/auth'
import { navigate } from "gatsby"

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
const RefreshUserToken = ({refreshToken, path}) => {      
  const dispatch = useDispatch()
  const [tokenMutation, {loading, data}] = useMutation(REFRESH_TOKEN, {        
    onCompleted: (data) => {dispatch(refreshUser({
      username: data.refreshToken.payload.username,
      token: data.refreshToken.token,
      refreshToken: data.refreshToken.refreshToken,
      exp: data.refreshToken.payload.exp,
      origIat: data.refreshToken.payload.origIat
    }))
    navigate(path)
    },
    onError: (error) => console.error("Error refreshing token:", error),
  })

  useEffect(() => {      
    tokenMutation({ variables: {refreshToken} })
    }, [refreshToken, tokenMutation])

  
  if(loading) { console.log("refreshing token...") }
  if(!loading && data) { console.log('refreshing token: ', data) }

  return <></>
}

export default RefreshUserToken


