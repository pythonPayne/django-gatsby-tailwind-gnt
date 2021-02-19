import React, { useEffect } from 'react'
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
        <div>
            {data && data.verifyAccount.success && <div>Success! Link to login...</div>}
            {data && !data.verifyAccount.success && <div>{data.verifyAccount.errors.nonFieldErrors[0].message} Link to login...</div>}
            {data === undefined && <div>Send link again...</div>}
        </div>
    )
}

export default Activate
