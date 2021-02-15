import React from 'react'
import { graphql } from "gatsby"
import { useSelector } from "react-redux"
import Layout from '../components/Layout'

const Index = ({data}) => {
  const theme = useSelector((state) => state.layout.theme)
  const dark = theme === 'dark'

  return (
    <Layout>
      <div>test graphql connection: {data.DJANGO.hello}</div>
      <div>test redux: dark mode set to {dark ? "dark" : "light"}</div>      
    </Layout>
  )
}

export default Index

export const query = graphql`
  query {
    DJANGO {
      hello
    }
  }
`
