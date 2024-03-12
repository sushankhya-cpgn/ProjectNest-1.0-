import React, { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotify = () => {
    setIsOpen(!isOpen);
  };

  const closeNotify = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    if (!isOpen) {
      toggleNotify();
    } else {
      closeNotify();
    }
  };

  return (
    <div className={styles.notify_dropdown} onClick={handleClick}>
      <div className={styles.notify_icon}>
        <MdNotificationsNone />
        <img src="path_to_your_icon" alt="" />
      </div>
      {isOpen && (
        <div className={styles.dropdown_content}>
          <div className={styles.notifycont}>
            <h3 className="notify">Notifications</h3>
            <div className={styles.btnnshowtxt}>
              <p>Show only unread</p>
              <button></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
