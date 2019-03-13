import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { formatPostDate, formatReadingTime } from "../utils/helpers"

const GITHUB_USERNAME = "thmsmlr"
const GITHUB_REPO_NAME = "thmsmlr.com"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, slug } = this.props.pageContext

    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages${slug}index.md`

    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://thmsmlr.com${slug}`
    )}`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <main>
          <article>
            <header>
              <h1>{post.frontmatter.title}</h1>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                  marginTop: rhythm(-1),
                }}
              >
                {post.frontmatter.date}
                {` • ${formatReadingTime(post.timeToRead)}`}
              </p>
            </header>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          <footer>
            <p>
              <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                Discuss on Twitter
              </a>
              {` • `}
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                Edit on GitHub
              </a>
            </p>
          </footer>
        </main>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
