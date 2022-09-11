import "./register.css";
import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const { setToken } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await registerUser(username, password);
    if (!result.success) {
      setError(result.error.message);
    } else {
      localStorage.setItem("token", result.data.token);
      setToken(result.data.token);
      navigate("/");
      setUsername("");
      setPassword("");
    }
    console.log(result);
  };

  return (
    <div id="registrationField">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username *"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* <input type="text" placeholder="Confirm Password *" /> */}
        <button>Register</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Register;
