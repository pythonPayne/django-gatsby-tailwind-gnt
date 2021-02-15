module.exports = {  
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: "gatsby-source-graphql",
      options: {        
        typeName: "django",        
        fieldName: "DJANGO",        
        url: "http://0.0.0.0:5000/graphql/",
      },
    },
  ],
}
