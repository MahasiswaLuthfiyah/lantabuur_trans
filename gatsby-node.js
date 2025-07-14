const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`🚨  ERROR: Loading "createPages" query`);
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node }) => {
    const id = node.id;

    // Gunakan frontmatter.path jika ada, fallback ke slug
    const pagePath = (node.frontmatter.path || node.fields.slug).toLowerCase();

    createPage({
      path: pagePath,
      component: path.resolve(
        `src/templates/${String(node.frontmatter.templateKey)}.js`
      ),
      context: { id },
    });
  });

  // Buat halaman untuk tags
  let tags = [];
  posts.forEach(({ node }) => {
    if (_.get(node, 'frontmatter.tags')) {
      tags = tags.concat(node.frontmatter.tags);
    }
  });
  tags = _.uniq(tags);

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: path.resolve('src/templates/tags.js'),
      context: { tag },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
