import React from "react";
import styles from "./Message.module.css"; // Import the CSS module

const Message = ({ user, message, classs }) => {
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

export default Message;
