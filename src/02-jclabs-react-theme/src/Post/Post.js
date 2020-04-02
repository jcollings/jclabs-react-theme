import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  parseLink(link) {
    if (typeof link === 'undefined') {
      return '/';
    }

    if (!link.match(/https?:\/\//)) {
      return link;
    }
    const pos = link.indexOf('/', 8);
    return link.substr(pos);
  }

  render() {
    const { post } = this.props;
    return (
      <article className="post">
        <header className="post__header">
          <h1>{post.title.rendered}</h1>
        </header>
        <section
          className="post__excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <Link to={this.parseLink(post.link)} className="btn">
          View Post
        </Link>
      </article>
    );
  }
}

export default Post;
