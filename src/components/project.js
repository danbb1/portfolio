import React, { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link } from "gatsby"

import {
  arrowWrapper,
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
import useWindowSize from "../utils/useWindowSize"

const Project = ({ children, frontmatter }) => {
  const [viewProject, setViewProject] = useState(false)

  const { windowSize } = useWindowSize()

  return (
    <div className={projectStyle}>
      {children}
      <div className={projectContent}>
        <span
          className={`${projectStatus} ${
            frontmatter.status === "Development" && developmentStyle
          } ${frontmatter.status === "Production" && productionStyle}`}
        >
          {frontmatter.status}
        </span>
        <h3>{frontmatter.heading}</h3>
        <a href={frontmatter.link} target="_blank" rel="noreferrer noopener">
          {frontmatter.link}
        </a>
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
            {windowSize.windowWidth > 768 && (
              <>
                <ul>
                  {frontmatter?.inclusions.map(inclusion => (
                    <li key={`${frontmatter.heading}-${inclusion}`}>
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Link
              to={`/projects/${frontmatter.heading
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")}/`}
            >
              View Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
