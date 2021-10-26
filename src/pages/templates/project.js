import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Project = ({ data }) => (
  <Layout>
    <SEO title={data.mdx.frontmatter.heading} />
    <MDXRenderer>{data.mdx.body}</MDXRenderer>
  </Layout>
)

export default Project

export const query = graphql`
  query ($heading: String!) {
    mdx(frontmatter: { heading: { eq: $heading } }) {
      body
      frontmatter {
        status
        description
        inclusions
        link
        heading
        image {
          childImageSharp {
            gatsbyImageData(quality: 95)
          }
        }
      }
    }
  }
`
