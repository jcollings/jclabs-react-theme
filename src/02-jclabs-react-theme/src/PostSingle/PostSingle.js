import React, { Component } from 'react';

class PostSingle extends Component {
  render() {
    const { post } = this.props;
    return (
      <article className="post">
        <header className="post__header">
          <h1>{post.title.rendered}</h1>
        </header>
        <section
          className="post__content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    );
  }
}

export default PostSingle;
