import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";

// ✅ Komponen Template
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  mainpitch,
  description,
  subdescription,
  intro,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} title={title} />

      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <p>{mainpitch.description}</p>
                  </div>

                  <div className="columns">
                    <div className="column is-12">
                      {/* ⚡️ Ganti H3 → H2 */}
                      <h2 className="has-text-weight-semibold is-size-2">
                        {heading}
                      </h2>
                      <p>{description}</p>
                      <p>{subdescription}</p>
                    </div>
                  </div>

                  {/* Jika komponen Features punya judul sendiri, pastikan hirarkinya H3 */}
                  {intro.heading && (
                    <h3 className="has-text-weight-semibold is-size-3">
                      {intro.heading}
                    </h3>
                  )}
                  {intro.description && <p>{intro.description}</p>}

                  <Features gridItems={intro.blurbs} />

                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/harga">
                        Lihat Semua Harga
                      </Link>
                    </div>
                  </div>

                  <div className="column is-12">
                    {/* ⚡️ Ganti H3 → H2 */}
                    <h2 className="has-text-weight-semibold is-size-2">
                      Cerita Terbaru
                    </h2>
                    <BlogRoll />
                    <div className="column is-12 has-text-centered">
                      <Link className="button" to="/blog">
                        Lihat semua cerita →
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  subdescription: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
};

// ✅ Komponen Halaman
const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        subdescription={frontmatter.subdescription}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

// ✅ Query GraphQL
export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        mainpitch {
          title
          description
        }
        description
        subdescription
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
