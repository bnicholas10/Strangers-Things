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
        //refine to compare all values as lowercase
        (post) =>
          post.title.includes(queryString) ||
          post.description.includes(queryString) ||
          post.price.includes(queryString) ||
          post.location.includes(queryString) ||
          post.author.username.includes(queryString)
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
          <h4>{post.title}</h4>
          <p>{post.description}</p>
          <p>Price: {post.price}</p>
          <p>Seller: {post.author.username}</p>
          <p>Location: {post.location}</p>

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
