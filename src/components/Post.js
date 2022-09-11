import { useParams, Route, Routes, Link, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import { useState } from "react";
import { deletePost, fetchPosts, sendMessage } from "../api";

const Post = (props) => {
  const { posts, setPosts, token } = props;
  const [message, setMessage] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const selectedPost = posts.filter((post) => post._id === params.postId)[0];
  // console.log(selectedPost);

  const handleDelete = async (event) => {
    event.preventDefault();
    const result = await deletePost(selectedPost._id, token);
    console.log(result);
    const posts = await fetchPosts(token);
    console.log(posts);
    setPosts(posts);
    navigate("/profile");
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const result = await sendMessage(selectedPost._id, token, message);
    setMessage("");
    console.log("RESULTS: ", result);
  };

  if (!selectedPost) {
    return <></>;
  }

  return (
    <div>
      <div className="post">
        <h3>Title: {selectedPost.title} </h3>
        <p>Description: {selectedPost.description} </p>
        <p>Price: {selectedPost.price} </p>
        <span>
          Location: {selectedPost.location}{" "}
          {selectedPost.willDeliver && <span>. Will Deliver!</span>}
        </span>
        {selectedPost.isAuthor ? (
          <div>
            <Link to={"edit"}>
              <button>Edit Post</button>
            </Link>
            <button onClick={handleDelete}>Delete Post</button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Message User"
              value={message}
              onChange={(event) => {
                event.preventDefault();
                setMessage(event.target.value);
              }}
            />
            <button>Send Message</button>
          </form>
        )}
      </div>
      {selectedPost.isAuthor && (
        <div>
          {selectedPost.messages.length ? (
            <div>
              <h2>Messages:</h2>
              {selectedPost.messages.map((message, index) => (
                <span className="message" key={index}>
                  <h4>From: {message.fromUser.username}</h4>
                  <p>Message: {message.content}</p>
                </span>
              ))}
            </div>
          ) : (
            <span>No messages yet</span>
          )}
        </div>
      )}
      <Routes>
        <Route element={<EditPost post={selectedPost} />} path="edit" />
      </Routes>
    </div>
  );
};

export default Post;
