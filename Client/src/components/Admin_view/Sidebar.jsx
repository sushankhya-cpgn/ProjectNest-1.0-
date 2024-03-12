import styles from "./Sidebar.module.css";
import { MdOutlineAssignment } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Sidebar() {
  const [hide, setHide] = useState(false);
  function handlehide() {
    setHide(!hide);
  }

  return (
    <div className={!hide ? `${styles.sidebar}` : `${styles.hidesidebar}`}>
      <div className={styles.sideBarItemContainer}>
        <div
          className={
            !hide ? `${styles.sidebaritem}` : `${styles.hidesidebaritems}`
          }
        >
          <Link to="addproject">
            <MdOutlineAssignment size={20} />
            {!hide ? (
              <span className={styles.sidebarOption}>Add Project</span>
            ) : (
              <></>
            )}
          </Link>
        </div>
        <div
          className={
            !hide ? `${styles.sidebaritem}` : `${styles.hidesidebaritems}`
          }
        >
          <Link to="editproject">
            <FiEdit size={20} />

            {!hide ? (
              <span className={styles.sidebarOption}>Edit Project</span>
            ) : (
              <></>
            )}
          </Link>
        </div>

        <div
          className={
            !hide ? `${styles.sidebaritem}` : `${styles.hidesidebaritems}`
          }
        >
          <Link to="adminprojectdetails">
            <TbListDetails size={20} />
            {!hide ? (
              <span className={styles.sidebarOption}>Project Details</span>
            ) : (
              <></>
            )}
          </Link>
        </div>
        <div
          className={
            !hide ? `${styles.sidebaritem}` : `${styles.hidesidebaritems}`
          }
        >
          <Link to="settings">
            <FiSettings size={20} />
            {!hide ? (
              <span className={styles.sidebarOption}>Settings</span>
            ) : (
              <></>
            )}
          </Link>
        </div>
      </div>
      <div
        className={styles.sidebaritem}
        id={styles["sidebar_toggler"]}
        onClick={handlehide}
      >
        {!hide ? (
          <>
            {" "}
            <BiArrowBack size={20} />{" "}
          </>
        ) : (
          <>
            <IoMdArrowForward size={30} />
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
