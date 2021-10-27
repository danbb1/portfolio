import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { AiOutlineArrowLeft } from "react-icons/ai"
import PropTypes from "prop-types"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { projectWrapper, homeLink } from "./project.module.css"

const Project = ({ data }) => (
  <Layout>
    <SEO title={data.mdx.frontmatter.heading} />
    <div className={projectWrapper}>
      <div>
        <Link to="/" className={homeLink}>
          <AiOutlineArrowLeft />
          Back Home
        </Link>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </div>
    </div>
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

Project.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        heading: PropTypes.string,
      }),
      body: PropTypes.string.isRequired,
    }),
  }).isRequired,
}
