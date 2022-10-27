import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Post from "./components/Post";
import CreatePost from "./components/Add";
import EditPost from "./components/EditPost";
import Profile from "./components/Profile";

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const checkToken = () => {
    if (token === "" && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      console.log(`fetched token from local`);
    }
  };
  checkToken();

  const handleFetchPosts = async (token) => {
    const postsList = await fetchPosts(token);
    setPosts(postsList);
  };

  const handleFetchUser = async (token) => {
    if (!token) {
      return;
    }
    const user = await fetchUser(token);
    setUser(user.data);
  };

  useEffect(() => {
    handleFetchPosts(token);
    handleFetchUser(token);
  }, [token]);

  // console.log("USER", user);
  return (
    <div className="App">
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/posts"}
          element={<Posts posts={posts} token={token} />}
        />
        <Route
          path={"posts/:postId/*"}
          element={<Post posts={posts} setPosts={setPosts} token={token} />}
        />
        <Route
          path={"/profile"}
          element={<Profile posts={posts} user={user} setUser={setUser} />}
        />
        <Route
          path={"/login"}
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path={"/register"} element={<Register setToken={setToken} />} />
        <Route
          path={"/add"}
          element={<CreatePost setPosts={setPosts} token={token} />}
        />
      </Routes>
    </div>
  );
}

export default App;
