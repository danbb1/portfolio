exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allFile(filter: { relativeDirectory: { eq: "projects" } }) {
        edges {
          node {
            childMdx {
              body
              frontmatter {
                description
                heading
                status
                image {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                link
                inclusions
              }
            }
          }
        }
      }
    }
  `);

  data.allFile.edges.forEach(edge => {
    const path = edge.node.childMdx.frontmatter.heading
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    console.log('Createing page', path);

    actions.createPage({
      path: `/projects/${path}`,
      component: require.resolve('./src/pages/templates/project.js'),
      context: { heading: edge.node.childMdx.frontmatter.heading },
    });

    console.log('Success');
  });
};
