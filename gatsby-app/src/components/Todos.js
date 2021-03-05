import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Layout from './Layout'
import { gql, useQuery, useMutation } from '@apollo/client'

const CREATE_TODO = gql`
mutation createTodo($todo: String!, $done: Boolean!, $date: DateTime!){
  createTodo(todo: $todo, done: $done, date: $date){
    createTodo{
      id
    }
  }
}`
const GET_TODOS = gql`
query MyQuery {
  myTodos {
    edges {
      node {
        date
        done
        id
        todo
      }
    }
  }
}`
const UPDATE_TODO = gql`
mutation updateTodo($id: Int!, $todo: String!, $done: Boolean!){
  updateTodo(id: $id, todo: $todo, done: $done){
    updateTodo{
      id
    }
  }
}`
const DELETE_TODO = gql`
mutation deleteTodo($id: Int!){
  deleteTodo(id: $id){
    deleteTodo{
      id
    }
  }
}`
const Todos = ({dark}) => {
  const [todo, setTodo] = useState('')
  const { loading, error, data, refetch } = useQuery(GET_TODOS)  
  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: () => refetch()
  })
  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: () => refetch()
  })
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => refetch()
  })
 
  const inputClass = `border-b-2 focus:outline-none p-2
  border-gray-300 bg-gray-50 text-blue-400 placeholder-gray-400 placeholder-opacity-50
${dark && "border-gray-900 bg-gray-800 text-blue-400 placeholder-gray-400 placeholder-opacity-50"}`

  return (
      <Layout>
        <div className={`px-4`}>
          <form 
            className={`flex flex-col space-y-2 mb-8`}
            onSubmit={(e) => {e.preventDefault(); createTodo({variables: {todo:todo, done:false, date:"2006-01-02T16:04:05"}}); setTodo('')}}>
              <input className={inputClass} type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
              <button 
                className={`focus:outline-none px-2 py-1 w-full text-gray-700 font-thin tracking-wide
                          bg-gray-200 bg-opacity-60 hover:bg-gray-100 rounded-lg 
                ${dark && "bg-gray-700 hover:bg-gray-600 text-blue-300 rounded-lg"}`}
                type="submit">Add Todo</button>
          </form>
          <div className={`flex flex-col space-y-2`}>
          {data && data.myTodos.edges.map((todo) => (          
            <div className={`flex space-x-2 items-center border-l-4 border-gray-600
            ${dark && "text-gray-300"}`} key={todo.node.id}>
              <div className={`w-10/12 pl-4 text-sm ${todo.node.done && "line-through"}`}>{todo.node.todo}</div>
              <button
              className={`flex items-center justify-center w-6 h-6 rounded-full focus:outline-none bg-blue-400 hover:bg-blue-600`} 
              onClick={() => updateTodo({variables: {id:todo.node.id, todo:todo.node.todo, done:!todo.node.done}})}></button>
              <button 
              className={`flex items-center justify-center w-6 h-6 rounded-full focus:outline-none bg-red-400 hover:bg-red-600`} 
              onClick={() => deleteTodo({variables: {id:todo.node.id}})}></button>
            </div>))
          }
          </div>
        </div>
        <div className={`fixed w-full px-2 bottom-0 h-10 bg-gray-50 text-green-400 text-xl border-t flex justify-around items-center
        ${dark && "bg-gray-900 border-none"}`}>
          <div><Link to="/app/todos">Todos</Link></div>
          <div><Link to="/app">Profile</Link></div>          
        </div>
      </Layout>
  )
}

export default Todos
