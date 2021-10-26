import React, { useEffect, useRef } from "react"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { AiOutlineFilePdf } from "react-icons/ai"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Project from "../components/project"
import Section from "../components/section"

import CV from "../data/cv.pdf"

import {
  headshot,
  introContainer,
  headshotWrapper,
  projectsHeading,
  projectsWrapper,
} from "./index.module.css"

const Projects = React.forwardRef((props, ref) => {
  const { projects } = props

  const sortedProjects = projects.sort((a, b) => {
    if (a.node.frontmatter.status === "Production") return -1
    if (b.node.frontmatter.status === "Production") return 1
    if (a.node.frontmatter.status === "Just for Fun") return 1
    if (a.node.frontmatter.status === b.node.frontmatter.status) return 0
  })

  return (
    <div ref={ref}>
      <h2 className={projectsHeading}>Projects</h2>
      <div className={projectsWrapper}>
        {sortedProjects.map(project => (
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
    </div>
  )
})

const IndexPage = ({ data }) => {
  const ref = useRef()

  useEffect(() => {}, [ref])

  return (
    <Layout projectsRef={ref} index>
      <Seo title="Home" />
      <Section className={introContainer}>
        <div>
          <p>
            I am a self taught web developer from Stockport. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Minus labore, magnam
            necessitatibus porro quis repudiandae odit sapiente, iure fuga magni
            possimus hic officia tempora cum nobis iste veritatis, totam
            voluptates.
          </p>
          <a href={CV}>
            <AiOutlineFilePdf />
            CV.pdf
          </a>
        </div>
        <div className={headshotWrapper}>
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
        </div>
      </Section>
      <Projects ref={ref} projects={data?.allMdx.edges} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMdx {
      edges {
        node {
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
      }
    }
  }
`
