import React from "react"
import { AiOutlineGithub, AiOutlineMail } from "react-icons/ai"
import PropTypes from "prop-types"

import "../style/reset.css"
import "@fontsource/ubuntu"

import Hero from "./hero"

import { iconLink, linksWrapper, mainWrapper } from "./layout.module.css"

const Layout = ({ children, index }) => (
  <>
    <div>
      {index && <Hero />}
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.bool,
}

Layout.defaultProps = {
  index: false,
}

export default Layout
