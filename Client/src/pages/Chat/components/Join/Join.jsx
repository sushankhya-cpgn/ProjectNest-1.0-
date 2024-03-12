// Join.js

import React, { useState } from "react";
import styles from "./Join.module.css"; // Import CSS module
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
const Join = () => {
  const [name, setname] = useState("");

  return (
    <div className={styles.JoinPage}>
      <div className={styles.JoinContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1>Group Chat</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
          className={styles.joinInput}
        />
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/groupchat"
        >
          <button onClick={sendUser} className={styles.joinbtn}>
            Join Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
