import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from './Layout'
import { gql, useQuery, useMutation } from '@apollo/client'

const CREATE_SERMON = gql`
mutation createSermon($title: String!, $bcvStart: String!, $bcvStop: String!){
  createSermon(title: $title, bcvStart: $bcvStart, bcvStop: $bcvStop){
    createSermon{
      id
    }
  }
}`
const GET_SERMONS = gql`
query MyQuery {
  mySermons {
    edges {
      node {
        id
        title
        bcvStart
        bcvStop        
      }
    }
  }
}`
const DELETE_SERMON = gql`
mutation deleteSermon($id: Int!){
  deleteSermon(id: $id){
    deleteSermon{
      id
    }
  }
}`
const Sermons = ({dark}) => {
  const [title, setTitle] = useState('')
  const [bcvStart, setBcvStart] = useState('040101')
  const [bcvStop, setBcvStop] = useState('040103')
  const { loading, error, data, refetch } = useQuery(GET_SERMONS)  
  const [createSermon] = useMutation(CREATE_SERMON, {
    onCompleted: () => refetch()
  })  
  const [deleteSermon] = useMutation(DELETE_SERMON, {
    onCompleted: () => refetch()
  })
 
  const inputClass = `border-b-2 focus:outline-none p-2
  border-gray-300 bg-gray-50 text-blue-400 placeholder-gray-400 placeholder-opacity-50
${dark && "border-gray-900 bg-gray-800 text-blue-400 placeholder-gray-400 placeholder-opacity-50"}`

  console.log(bcvStart)

  return (
      <Layout>
        <div className={`px-4`}>
          <form 
            className={`flex flex-col space-y-2 mb-8`}
            onSubmit={(e) => {e.preventDefault(); createSermon({variables: {title, bcvStart, bcvStop}}); setTitle('')}}>
              <div className={`flex spacex2`}>
                <input className={inputClass} type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <select value={bcvStart} onChange={(e)=>setBcvStart(e.target.value)}>
                  <option value="040101">Jhn-1-1</option>
                  <option value="040102">Jhn-1-2</option>
                </select>
                <select value={bcvStop} onChange={(e)=>setBcvStop(e.target.value)}>
                  <option value="040103">Jhn-1-3</option>
                  <option value="040104">Jhn-1-4</option>
                </select>
              </div>
              <button 
                className={`focus:outline-none px-2 py-1 w-full text-gray-700 font-thin tracking-wide
                          bg-gray-200 bg-opacity-60 hover:bg-gray-100 rounded-lg 
                ${dark && "bg-gray-700 hover:bg-gray-600 text-blue-300 rounded-lg"}`}
                type="submit">Add Sermon</button>
          </form>
          <div className={`flex flex-col space-y-2`}>
          {data && data.mySermons.edges.map((sermon) => (          
            <div className={`flex space-x-2 items-center border-l-4 border-gray-600
            ${dark && "text-gray-300"}`} key={sermon.node.id}>
              <div className={`w-10/12 pl-4 text-sm`}>
                <Link to={`/app/sermons/${sermon.node.id}`}>{sermon.node.title}</Link>
              </div>              
              <button 
              className={`flex items-center justify-center w-6 h-6 rounded-full focus:outline-none bg-red-400 hover:bg-red-600`} 
              onClick={() => deleteSermon({variables: {id:sermon.node.id}})}></button>
            </div>))
          }
          </div>
        </div>
        <div className={`fixed w-full px-2 bottom-0 h-10 bg-gray-50 text-green-400 text-xl border-t flex justify-around items-center
        ${dark && "bg-gray-900 border-none"}`}>
          <div><Link to="/app/sermons">Sermons</Link></div>
          <div><Link to="/app">Profile</Link></div>          
        </div>
      </Layout>
  )
}

export default Sermons
