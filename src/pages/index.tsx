import React from 'react';
import { StaticImage, GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';
import { AiOutlineFilePdf } from 'react-icons/ai';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Project from '../components/project';
import Section from '../components/section';

import CV from '../data/cv.pdf';

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
} from './index.module.css';

const Projects = ({ projects }: { projects: ProjectType[] }) => (
  <div id="projects-anchor" className={projectsWrapper}>
    <div>
      <div className={projectsHeadingContainer}>
        <h2 className={projectsHeading}>Projects</h2>
        <p className={projectsSubheading}>Some of the the things I have built</p>
      </div>
    </div>
    {projects.map((project, index) => {
      const image = getImage(project.node.frontmatter.image);

      return (
        <Project key={project.node.frontmatter.heading} frontmatter={project.node.frontmatter} index={index}>
          {image && <GatsbyImage image={image} alt="Dan Bridges web developer" />}
        </Project>
      );
    })}
  </div>
);

const IndexPage = ({ data }: { data: Query }) => {
  const projects = data ? [...data.Production.edges, ...data.Development.edges, ...data.JustForFun.edges] : null;

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
            formats={['auto', 'webp', 'avif']}
            alt="Dan Bridges web developer"
          />
        </div>
        <div className={introTextContainer}>
          <p className={introText}>
            I am a self taught web developer based in Stockport skilled in HTML, CSS, JavaScript, React, Gatsby,
            Serverless Functions.
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
      {projects && <Projects projects={projects} />}
    </Layout>
  );
};

export default IndexPage;

type FrontmattterType = {
  status: 'Production' | 'Just for Fun' | 'Development';
  link: string;
  heading: string;
  title: string;
  image: IGatsbyImageData;
};

type ProjectType = {
  node: {
    body: string;
    frontmatter: FrontmattterType;
  };
};

type Query = {
  Production: {
    edges: ProjectType[];
  };
  Development: {
    edges: ProjectType[];
  };
  JustForFun: {
    edges: ProjectType[];
  };
};

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
          gatsbyImageData(quality: 95, layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
  query {
    Production: allMdx(filter: { frontmatter: { status: { eq: "Production" } } }) {
      edges {
        node {
          ...projectInfo
        }
      }
    }
    Development: allMdx(filter: { frontmatter: { status: { eq: "Development" } } }) {
      edges {
        node {
          ...projectInfo
        }
      }
    }
    JustForFun: allMdx(filter: { frontmatter: { status: { eq: "Just for Fun" } } }) {
      edges {
        node {
          ...projectInfo
        }
      }
    }
  }
`;
