import React, { useContext, useState } from "react";
import styles from "./SignInform.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoggedIn from "../../../pages/AdminPage/AdminPage";
import axios from "axios";
import AuthContext from "../AuthProvider/AuthProvider";

const SignInform = ({ clicked, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ auth: false, name: "" });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);

    axios
      .post("http://localhost:8000/api/v1/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("jwtToken", res.data.token);
        currentUser.getUser();
        axios.defaults.headers.common["Authorization"] =
          "Bearer" + res.data.token;
        setUser({ auth: true, name: res.data.data.user.email });
        if (res.data.data.user.role === "admin") {
          console.log("decoding Ravi");
          navigate("/admin/addproject");
        }
        if (
          res.data.data.user.role === "supervisor" ||
          res.data.data.user.role === "student"
        ) {
          navigate("/task");
        }
        if (res.data.data.user.role === "student") {
          navigate("/studenttask");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) setErrors("Invalid credentials");
          else setErrors("Please try again.");

          navigate("/");
          alert("Invalid Email or Password");
        }
        console.log(err);
      });

    // handleClick(!clicked);
  }

  function handlecross() {
    setEmail("");
    setPassword("");
    handleClick();
  }

  return (
    <div className={clicked ? `${styles.SignInform}` : `${styles.hidden}`}>
      <div className={styles.SignInform_quit}>
        <div className={styles.cross} onClick={handlecross}>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            {" "}
            &#10006;
          </Link>
        </div>
      </div>
      <h1 style={{ textAlign: "center", color: "azure" }}> SignIn</h1>
      <form onSubmit={handleSubmit} className={styles.signInFormForm}>
        <InputItem
          value={email}
          type="email"
          placeholder={"Enter your email"}
          onChange={setEmail}
        />
        <InputItem
          value={password}
          type="password"
          placeholder={"Enter your password"}
          onChange={setPassword}
        />

        <div className={styles.submit}>
          <input type="submit" className={styles.submitbtn}></input>
        </div>
      </form>
    </div>
  );
};

function InputItem(props) {
  return (
    <div className={styles.inputbox}>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className={styles.inputfields}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
export default SignInform;
