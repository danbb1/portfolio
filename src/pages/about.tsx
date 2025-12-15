import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { projectWrapper, homeLink } from './templates/project.module.css';

const About = ({ data }: { data: Query }) => (
  <Layout>
    <SEO title="About" />
    <div className={projectWrapper}>
      <Link to="/" className={homeLink}>
        <AiOutlineArrowLeft />
        Back
      </Link>
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </div>
  </Layout>
);

export default About;

type Query = {
  file: {
    childMdx: {
      body: string;
    };
  };
};

export const query = graphql`
  query {
    file(relativePath: { eq: "about.mdx" }) {
      childMdx {
        body
      }
    }
  }
`;
