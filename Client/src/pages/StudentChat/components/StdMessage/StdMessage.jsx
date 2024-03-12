import React from "react";
import styles from "./StdMessage.module.css"; // Import the CSS module

const StdMessage = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`${styles.messageBox} ${styles[classs]}`}>
        {`${user}: ${message}`}
      </div>
    );
  } else {
    return (
      <div className={`${styles.messageBox} ${styles[classs]}`}>
        {`You: ${message}`}
      </div>
    );
  }
};

export default StdMessage;
