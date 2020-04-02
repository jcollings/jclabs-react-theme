import React, { Component } from 'react';
import Axios from 'axios';
import Post from '../Post/Post';
import debounce from 'lodash.debounce';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loaded: false,
      error: '',
      hasMore: true,
      page: 1
    };

    this.getPosts = this.getPosts.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.onScroll = debounce(this.onScroll.bind(this), 100);
  }

  getPosts() {
    const { page } = this.state;
    this.setState({ loaded: false });

    return Axios.get(
      window.wp_config.rest_url + 'wp/v2/posts?page=' + page
    ).then(
      response => {
        const { posts, page } = this.state;
        this.setState({
          posts: posts.concat(response.data),
          loaded: true,
          page: page + 1
        });
      },
      error => {
        this.setState({
          error: error.toJSON().message,
          loaded: true,
          hasMore: false
        });
      }
    );
  }

  componentDidMount() {
    this.loadMore();

    window.addEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const node = this.scrollBox;
    if (node) {
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        const nodeOffset = node.offsetTop;
        const nodeHeight = node.offsetHeight;

        /**
         * Trigger loadMore if less than a screen hight
         * from end of archive
         */
        if (
          scrollPos - nodeOffset + windowHeight > nodeHeight - windowHeight &&
          this.state.loaded === true &&
          this.state.hasMore
        ) {
          this.loadMore();
        }
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  loadMore() {
    this.getPosts().then(() => {
      /**
       * Check to see if content loaded is
       * greater than the height of the screen,
       * if not load next page of data.
       */
      const node = this.scrollBox;
      if (window.innerHeight > node.offsetTop + node.offsetHeight) {
        this.loadMore();
      }
    });
  }

  render() {
    const { posts, loaded, error, page } = this.state;
    return (
      <div className="archive">
        <div className="archive__header">
          <h1 className="archive__heading">Recent Posts</h1>
        </div>
        {error && page === 0 && (
          <div className="notice notice--error">
            <p>Unable to load posts due to the error: {error}</p>
          </div>
        )}
        {posts && posts && (
          <div
            className="archive__body"
            ref={scrollBox => (this.scrollBox = scrollBox)}
          >
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
        {!loaded && (
          <div className="notice notice--loading">
            <p>Loading.</p>
          </div>
        )}
      </div>
    );
  }
}

export default Archive;
