import { useState } from "react";
import { login } from "../service/postService";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logIn = () => {
    login(email, password)
      .then((data) => {
        if (data.email !== undefined) {
          alert(data.email);
        }
        if (data.password !== undefined) {
          alert(data.password);
        }
        if (data.token !== undefined) {
          if (data.token === "") {
            alert("Email or password is incorrect");
          } else {
            localStorage.setItem("token", data.token);
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.error("login() failed:", error);
      });
  };
  return (
    <div className="form-login">
      <div className="form">
        <div className="container">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button id="login" onClick={() => logIn()}>
            Login
          </button>
          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>
        </div>
        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </div>
    </div>
  );
};
