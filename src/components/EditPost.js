import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editPost, fetchPosts } from "../api";

const EditPost = (props) => {
  const { token, post, setPosts } = props;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [location, setLocation] = useState(post.location);
  const [willDeliver, setWillDeliver] = useState(post.willDeliver);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await editPost(
      token,
      post._id,
      title,
      description,
      price,
      location,
      willDeliver
    );
    if (!result.success) {
      setError(result.error.message);
    } else {
      const posts = await fetchPosts(token);
      setPosts(posts);
      navigate(`../`);
    }
    // console.log("RESULT: ", result);
    console.log("POST: ", post);
  };
  return (
    <div>
      <form id="addForm" onSubmit={handleSubmit}>
        <h1>Edit Post</h1>
        <input
          placeholder={post.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder={post.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder={post.price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder={post.location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <div id="delivery">
          <input
            type="checkbox"
            onChange={() => setWillDeliver(!willDeliver)}
          />
          <span>Will Deliver</span>
        </div>
        <button>Edit</button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default EditPost;
