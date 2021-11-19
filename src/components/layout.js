import React, { useState, useEffect } from "react"
import { AiOutlineGithub, AiOutlineMail } from "react-icons/ai"
import PropTypes from "prop-types"

import "../style/reset.css"
import "@fontsource/ubuntu"

import Hero from "./hero"

import { iconLink, linksWrapper, mainWrapper } from "./layout.module.css"

const Layout = ({ children, projectsRef, index }) => {
  const [projectsElRef, setProjectsElRef] = useState()

  useEffect(() => {
    if (!projectsRef) return
    setProjectsElRef(projectsRef.current)
  }, [projectsRef])

  return (
    <>
      <div>
        {index && <Hero projectsRef={projectsElRef && projectsElRef} />}
        <main className={mainWrapper}>{children}</main>
        <footer>
          <div className={linksWrapper}>
            <a className={iconLink} href="https://www.github.com/danbb1/">
              <AiOutlineGithub /> @danbb1
            </a>
            <a href="mailto:hello@danbridges.co.uk" className={iconLink}>
              <AiOutlineMail />
              hello@danbridges.co.uk
            </a>
          </div>

          <span>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </span>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  projectsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  index: PropTypes.bool,
}

Layout.defaultProps = {
  index: false,
  projectsRef: undefined,
}

export default Layout
