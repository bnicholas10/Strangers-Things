import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = (props) => {
  const { posts, user } = props;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(user.messages);
  }, [user]);
  console.log(messages);
  return (
    <div id="profile">
      <h1 id="profileTitle">{`Welcome, ${user.username}`}</h1>
      <div id="myPosts" className="subSection">
        <h1>My posts</h1>
        {posts
          .filter((post) => post.isAuthor)
          .map((post, index) => (
            <div className="post" key={index}>
              <h3>{post.title}</h3>
              <div className="content">
                <p>{`-"${post.description}"`}</p>
                <p>Price: {post.price}</p>
                <p>Seller: {post.author.username}</p>
                <p>Location: {post.location}</p>
              </div>
              <Link to={`../posts/${post._id}`}>
                <button>View Post</button>
              </Link>
            </div>
          ))}
      </div>
      <div id="myInbox" className="subSection">
        <h1>My Inbox</h1>
        {messages ? (
          messages
            .filter((message) => message.fromUser.username !== user.username)
            .map((message, index) => (
              <div id className="post" key={index}>
                <h3>{`From: ${message.fromUser.username}`}</h3>
                <p>{`-"${message.content}"`}</p>
                <Link to={`../posts/${message.post._id}`}>
                  <p className="messageLink">{`From post: ${message.post.title}`}</p>
                </Link>
              </div>
            ))
        ) : (
          <p>no messages yet</p>
        )}
      </div>
      <div id="myOutbox" className="subSection">
        <h1>My Outbox</h1>
        {messages ? (
          messages
            .filter((message) => message.fromUser.username === user.username)
            .map((message, index) => (
              <div className="post" key={index}>
                <p>{`-"${message.content}"`}</p>
                <Link to={`../posts/${message.post._id}`}>
                  <p className="messageLink">{`Regarding Post: ${message.post.title}`}</p>
                </Link>
              </div>
            ))
        ) : (
          <p>no messages yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
