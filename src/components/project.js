import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import useWindowSize from "../utils/useWindowSize"
import useIsVisible from "../utils/useIsVisible"

import {
  caseStudyLink,
  development as developmentStyle,
  production as productionStyle,
  project as projectStyle,
  projectContent,
  projectLink,
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

const Project = ({ children, frontmatter, index }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const translateXDistance = index % 2 ? 0 : `-100%`
  const translateYDistance = Math.ceil(index / 2) * -100

  const ref = useRef()

  const { windowSize } = useWindowSize()

  const isVisible = useIsVisible(ref, "-200px")

  useEffect(() => {
    if (hasBeenVisible) return

    if (isVisible) setHasBeenVisible(true)
  }, [isVisible])

  return (
    <div
      ref={ref}
      style={{
        transform: `translateX(${
          windowSize.windowWidth >= 1024 && !isVisible && !hasBeenVisible
            ? translateXDistance
            : 0
        }) translateY(${
          windowSize.windowWidth >= 1024 && !isVisible && !hasBeenVisible
            ? translateYDistance
            : 0
        }%)`,
      }}
      className={projectStyle}
    >
      {children}
      <div className={projectContent}>
        <ProjectStatus status={frontmatter.status} />
        <h3>{frontmatter.heading}</h3>
        <a
          className={projectLink}
          href={frontmatter.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>{frontmatter.link}</span>
        </a>
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

Project.propTypes = {
  children: PropTypes.node.isRequired,
  frontmatter: PropTypes.shape(frontmatterShape).isRequired,
}
