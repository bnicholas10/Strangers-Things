import "./posts.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Posts = (props) => {
  const { posts, token } = props;
  const [queryString, setQueryString] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(queryString.toLowerCase()) ||
          post.description.toLowerCase().includes(queryString.toLowerCase()) ||
          post.price.toLowerCase().includes(queryString.toLowerCase()) ||
          post.location.toLowerCase().includes(queryString.toLowerCase()) ||
          post.author.username.toLowerCase().includes(queryString.toLowerCase())
      )
    );
  }, [posts, queryString]);
  // console.log(filteredPosts);

  return (
    <div>
      <div id="postsHeader">
        <h2>Listings</h2>
        <div>
          <input
            id="searchBar"
            type="text"
            placeholder="Search Posts..."
            onChange={(e) => {
              setQueryString(e.target.value);
            }}
          />
        </div>
        {token && (
          <Link to={"/add"} id="createListing">
            (Create Listing)
          </Link>
        )}
      </div>
      {filteredPosts.map((post, index) => (
        <div className="post" key={index}>
          <h3>{post.title}</h3>
          <div className="content">
            <p>{`-"${post.description}"`}</p>
            <p>Price: {post.price}</p>
            <p>Seller: {post.author.username}</p>
            <p>Location: {post.location}</p>
          </div>
          {token &&
            (post.isAuthor ? (
              <Link to={post._id}>
                <button>View Your Post</button>
              </Link>
            ) : (
              <Link to={post._id}>
                <button>View Post</button>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Posts;
