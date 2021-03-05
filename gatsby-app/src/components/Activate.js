import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import { gql, useMutation } from '@apollo/client'

const ACTIVATE_USER = gql`
  mutation ACTIVATE_USER($token: String!){
    verifyAccount(token: $token) {
      success,
      errors
    }
  }
`

const Activate = ({ activationID }) => {
    const [activateUser, { data }] = useMutation(ACTIVATE_USER)

    useEffect(() => {
        if (activationID.length > 0){
            activateUser({ variables: {token:activationID} })
        }
        return () => {
            console.log("cleaning up...")
        }
    }, [activationID, activateUser])
    console.log(data)
    return (
        <Layout>
            {data && data.verifyAccount.success && 
              <>
                <div>Account activated!</div>
                <Link to="/app/login">Login</Link>
              </>
            }
            
            {data && !data.verifyAccount.success && 
              <>
                <div>{data.verifyAccount.errors.nonFieldErrors[0].message}</div>
                <Link to="/app/login">Login</Link>
              </>
            }

            {data === undefined && <div>Send link again...</div>}
        </Layout>
    )
}

export default Activate
