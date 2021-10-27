import React, { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import {
  arrowWrapper,
  caseStudyLink,
  drawer,
  drawerButton,
  drawerContent,
  closeDrawerButton,
  opened,
  development as developmentStyle,
  production as productionStyle,
  project as projectStyle,
  projectContent,
  projectStatus,
} from "./project.module.css"

const ProjectStatus = ({ status }) => (
  <span
    className={`${projectStatus} ${
      status === "Development" && developmentStyle
    } ${status === "Production" && productionStyle}`}
  >
    {status}
  </span>
)

const Drawer = ({ frontmatter, viewProject, setViewProject }) => (
  <div className={`${drawer} ${viewProject ? `${opened}` : ""}`}>
    <button
      className={drawerButton}
      type="button"
      onClick={() => setViewProject(!viewProject)}
    >
      <div className={arrowWrapper}>
        <AiOutlineArrowLeft />
      </div>
    </button>
    <button
      className={closeDrawerButton}
      type="button"
      onClick={() => setViewProject(false)}
    >
      x
    </button>
    <div className={drawerContent}>
      <span>{frontmatter.heading}</span>
      <p>{frontmatter.description}</p>
      <>
        <ul>
          {frontmatter?.inclusions.map(inclusion => (
            <li key={`${frontmatter.heading}-${inclusion}`}>{inclusion}</li>
          ))}
        </ul>
      </>

      <Link
        className={caseStudyLink}
        to={`/projects/${frontmatter.heading
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")}/`}
      >
        View Case Study
      </Link>
    </div>
  </div>
)

const Project = ({ children, frontmatter }) => {
  const [viewProject, setViewProject] = useState(false)

  return (
    <div className={projectStyle}>
      {children}
      <div className={projectContent}>
        <ProjectStatus status={frontmatter.status} />
        <h3>{frontmatter.heading}</h3>
        <a href={frontmatter.link} target="_blank" rel="noreferrer noopener">
          {frontmatter.link}
        </a>
        <Drawer
          frontmatter={frontmatter}
          viewProject={viewProject}
          setViewProject={setViewProject}
        />
      </div>
    </div>
  )
}

export default Project

const frontmatterShape = {
  heading: PropTypes.string,
  description: PropTypes.string,
  inclusions: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
}

ProjectStatus.propTypes = {
  status: PropTypes.string.isRequired,
}

Drawer.propTypes = {
  frontmatter: PropTypes.shape(frontmatterShape).isRequired,
  viewProject: PropTypes.bool.isRequired,
  setViewProject: PropTypes.func.isRequired,
}

Project.propTypes = {
  children: PropTypes.node.isRequired,
  frontmatter: PropTypes.shape(frontmatterShape).isRequired,
}
