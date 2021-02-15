import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout'

const Index = ({data}) => {
  return (
    <Layout>
      {data.DJANGO.hello}
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
