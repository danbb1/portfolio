import React, { useEffect, useRef } from "react"
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
  headshot,
  introContainer,
  introText,
  projectsHeading,
  projectsWrapper,
} from "./index.module.css"

const Projects = React.forwardRef((props, ref) => {
  const { projects } = props

  return (
    <div ref={ref} id={props.id} className={projectsWrapper}>
      <h2 className={projectsHeading}>Projects</h2>
      {projects.map(project => (
        <Project
          key={project.node.frontmatter.heading}
          frontmatter={project.node.frontmatter}
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
})

const IndexPage = ({ data }) => {
  const ref = useRef()

  useEffect(() => {}, [ref])

  const projects = data
    ? [
        ...data.Production.edges,
        ...data.Development.edges,
        ...data.JustForFun.edges,
      ]
    : null

  return (
    <Layout projectsRef={ref} index>
      <Seo title="Home" />
      <Section className={introContainer}>
        <div>
          <p className={introText}>
            I am a self taught web developer from Stockport skilled in HTML,
            JavaScript, CSS, React, Gatsby, Serverless Functions. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos alias veniam hic, odio incidunt, ducimus unde ea enim saepe numquam rerum vitae suscipit? At voluptate odio ea inventore nam quibusdam.
          </p>
          <Link className={link} to="/about/">
            More About Me
          </Link>
          <a className={link} href={CV}>
            <AiOutlineFilePdf />
            CV.pdf
          </a>
        </div>
        <StaticImage
          className={headshot}
          src="../images/headshotbw.jpg"
          width={300}
          layout="constrained"
          objectFit="scale-down"
          quality={95}
          placeholder="blurred"
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Dan Bridges web developer"
        />
      </Section>
      <Projects ref={ref} projects={projects} id="projects-anchor" />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  fragment projectInfo on Mdx {
    body
    frontmatter {
      status
      description
      inclusions
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
