/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  siteMetadata: {
    title: `Dan Bridges`,
    description: `Web developer portfolio for Dan Bridges.`,
    author: `Dan Bridges`,
    siteUrl: `https://danbridges.co.uk`,
    image: `${__dirname}/static/headshotbw.jpg`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-bundle-stats`,
      options: {
        compare: true,
        outDir: '../artifacts',
        stats: {
          context: './src',
        },
      },
    },
    'gatsby-transformer-typescript-css-modules',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('postcss-import')(),
          require('postcss-nesting')(),
          require('postcss-extend-rule')(),
          require('postcss-custom-media')(),
          require('autoprefixer')(),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
