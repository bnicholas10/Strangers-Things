import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = (props) => {
  const { token, setToken } = props;

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    return;
  };

  return (
    <div id="navbar">
      <span id="title">Stranger's Things</span>
      <div id="navlinks">
        <Link to={"/"}>Home</Link>
        <Link to={"/posts"}>Posts</Link>
        {token && <Link to={"/profile"}>Profile</Link>}
        {!token && <Link to={"/login"}>Log In</Link>}
        {token && (
          <Link to={"/"} onClick={logOut}>
            Log Out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
