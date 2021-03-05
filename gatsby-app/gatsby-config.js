module.exports = {  
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {        
        typeName: "django",        
        fieldName: "DJANGO",        
        url: "http://0.0.0.0:5000/graphql/",
        
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
  ],
}
