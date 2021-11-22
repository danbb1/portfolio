import React from "react"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"
import { AiOutlineFilePdf } from "react-icons/ai"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Project from "../components/project"
import Section from "../components/section"

import CV from "../data/cv.pdf"

import {
  link,
  headshotWrapper,
  introContainer,
  introText,
  projectsHeading,
  projectsSubheading,
  projectsWrapper,
  projectsHeadingContainer,
  introTextContainer,
} from "./index.module.css"

const Projects = ({ projects, id }) => (
  <div id={id} className={projectsWrapper}>
    <div>
      <div className={projectsHeadingContainer}>
        <h2 className={projectsHeading}>Projects</h2>
        <p className={projectsSubheading}>
          Some of the the things I have built
        </p>
      </div>
    </div>

    {projects.map((project, index) => (
      <Project
        key={project.node.frontmatter.heading}
        frontmatter={project.node.frontmatter}
        index={index}
      >
        <GatsbyImage
          image={getImage(project.node.frontmatter.image)}
          layout="fullWidth"
          quality={95}
          placeholder="blurred"
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Dan Bridges web developer"
        />
      </Project>
    ))}
  </div>
)

const IndexPage = ({ data }) => {
  const projects = data
    ? [
        ...data.Production.edges,
        ...data.Development.edges,
        ...data.JustForFun.edges,
      ]
    : null

  return (
    <Layout index>
      <Seo title="Home" />
      <Section className={introContainer}>
        <div className={headshotWrapper}>
          <StaticImage
            src="../images/headshotbw.jpg"
            width={300}
            layout="constrained"
            objectFit="scale-down"
            quality={95}
            placeholder="blurred"
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Dan Bridges web developer"
          />
        </div>
        <div className={introTextContainer}>
          <p className={introText}>
            I am a self taught web developer based in Stockport skilled in HTML,
            CSS, JavaScript, React, Gatsby, Serverless Functions.
          </p>
          <Link className={link} to="/about/">
            More About Me
          </Link>
          <a className={link} href={CV}>
            <AiOutlineFilePdf />
            CV.pdf
          </a>
        </div>
      </Section>
      <Projects projects={projects} id="projects-anchor" />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  fragment projectInfo on Mdx {
    body
    frontmatter {
      status
      link
      heading
      title
      image {
        childImageSharp {
          gatsbyImageData(quality: 95)
        }
      }
    }
  }
  query {
    Production: allMdx(
      filter: { frontmatter: { status: { eq: "Production" } } }
    ) {
      edges {
        node {
          ...projectInfo
        }
      }
    }
    Development: allMdx(
      filter: { frontmatter: { status: { eq: "Development" } } }
    ) {
      edges {
        node {
          ...projectInfo
        }
      }
    }
    JustForFun: allMdx(
      filter: { frontmatter: { status: { eq: "Just for Fun" } } }
    ) {
      edges {
        node {
          ...projectInfo
        }
      }
    }
  }
`

const frontmatterShape = {
  heading: PropTypes.string,
  description: PropTypes.string,
  inclusions: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
  image: PropTypes.shape({}).isRequired,
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.shape(frontmatterShape),
      }),
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    Production: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    Development: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    JustForFun: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
}

IndexPage.defaultProps = {
  data: {},
}
