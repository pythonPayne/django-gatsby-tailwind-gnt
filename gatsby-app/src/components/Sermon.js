import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from './Layout'
import { gql, useQuery, useMutation } from '@apollo/client'

const GET_SERMONS = gql`
query MyQuery($id: String) {
  sermonById(id: $id) {
    id
    title
  }
}`
const Sermon = ({dark, sermonID}) => {
  const { loading, error, data, refetch } = useQuery(GET_SERMONS, {variables: { id:sermonID }})  
  console.log(sermonID)
  console.log(loading)
  console.log(error)
  console.log(data)
  return (
      <Layout>       
        <h1>{data && data.sermonById.title}</h1>
        <div className={`fixed w-full px-2 bottom-0 h-10 bg-gray-50 text-green-400 
        text-xl border-t flex justify-around items-center
        ${dark && "bg-gray-900 border-none"}`}>
          <div><Link to="/app/sermons">Sermons</Link></div>
          <div><Link to="/app">Profile</Link></div>          
        </div>
      </Layout>
  )
}

export default Sermon
