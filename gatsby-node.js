exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
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
  `)

  data.allMdx.edges.forEach(edge => {
    const path = edge.node.frontmatter.heading
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")

    console.log("Createing page", path)

    actions.createPage({
      path: `/projects/${path}`,
      component: require.resolve("./src/pages/templates/project.js"),
      context: { heading: edge.node.frontmatter.heading },
    })

    console.log("Success")
  })
}
