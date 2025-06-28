const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
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
              path
              tags
              templateKey
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

  // ✅ Buat halaman dari markdown
  posts.forEach(({ node }) => {
    const id = node.id;
    const templateKey = node.frontmatter.templateKey;

    if (templateKey) {
      // Gunakan frontmatter.path jika ada, fallback ke slug
      const pagePath = node.frontmatter.path || node.fields.slug;

      createPage({
        path: pagePath,
        component: path.resolve(`src/templates/${templateKey}.js`),
        context: { id },
      });
    }
  });

  // ✅ Kumpulkan semua tag unik
  let tags = [];
  posts.forEach(({ node }) => {
    if (_.get(node, 'frontmatter.tags')) {
      tags = tags.concat(node.frontmatter.tags);
    }
  });
  tags = _.uniq(tags);

  // ✅ Buat halaman untuk tiap tag
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
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
