import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Axios from 'axios';
import PostSingle from '../PostSingle/PostSingle';

class Single extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      loaded: false,
      error: ''
    };

    this.getPost = this.getPost.bind(this);
  }

  getPost(slug) {
    this.setState({ loaded: false });
    Axios.get(window.wp_config.rest_url + 'wp/v2/posts?slug=' + slug).then(
      response => {
        this.setState({
          post: response.data[0],
          loaded: true
        });
      },
      error => {
        this.setState({
          error: error.toJSON().message,
          loaded: true
        });
      }
    );
  }

  componentDidMount() {
    const { post } = this.props.match.params;
    this.getPost(post);
  }

  render() {
    const { post, loaded, error } = this.state;
    return (
      <div className="single">
        <Link to="/" className="back">
          &lt; Back
        </Link>
        {error && page === 0 && (
          <div className="notice notice--error">
            <p>Unable to load post due to the error: {error}</p>
          </div>
        )}
        {!loaded && (
          <div className="notice notice--loading">
            <p>Loading.</p>
          </div>
        )}
        {error && <p>Unable to load posts due to the error: {error}</p>}
        {loaded && post && <PostSingle post={post} />}
      </div>
    );
  }
}

export default withRouter(Single);
