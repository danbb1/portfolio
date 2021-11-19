import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { AiOutlineArrowLeft } from "react-icons/ai"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { projectWrapper, homeLink } from "./templates/project.module.css"

const About = ({ data }) => (
  <Layout>
    {console.log(data)}
    <SEO title="About" />
    <div className={projectWrapper}>
      <Link to="/" className={homeLink}>
        <AiOutlineArrowLeft />
        Back Home
      </Link>
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </div>
  </Layout>
)

export default About

export const query = graphql`
  query {
    file(relativePath: { eq: "about.mdx" }) {
      childMdx {
        body
      }
    }
  }
`

About.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childMdx: PropTypes.shape({
        body: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
}
