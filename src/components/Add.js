import { React, useState } from "react";
import "./add.css";
import { createPost, fetchPosts } from "../api";
import { useNavigate } from "react-router-dom";

const CreatePost = (props) => {
  const { token, setPosts } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("[On Request]");
  const [willDeliver, setWillDeliver] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = await createPost(
      token,
      title,
      description,
      price,
      location,
      willDeliver
    );
    if (!post.success) {
      setError(post.error.message);
    } else {
      const posts = await fetchPosts();
      setPosts(posts);
      navigate("/posts");
    }
    console.log(post);
  };

  console.log(title, description, price, location, willDeliver);

  return (
    <div>
      <form id="addForm" onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
        <input
          placeholder="Title *"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description *"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Price *"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Location *"
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
        <button>Create</button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};

export default CreatePost;
