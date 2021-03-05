import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout'

const Index = ({data}) => {
  return (
    <Layout>      
      <div>test graphql connection: {data.DJANGO.hello}</div>            
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
