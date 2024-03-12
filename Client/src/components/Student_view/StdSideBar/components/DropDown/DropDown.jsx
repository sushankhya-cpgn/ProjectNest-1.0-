import styles from "./DropDown.module.css";
import { MdArrowDropDown } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../../../../LoginPage/AuthProvider/AuthProvider";
import axios from "axios";
import { useState } from "react";
const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentProjects, setRecentProjects] = useState(undefined);
  const currentUser = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/projects  ",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        setRecentProjects(response.data.projects.map((pro) => pro.name));
      } catch (err) {
        setRecentProjects([]);
      }
    };
    if (!isOpen) {
      fetchData();
    }
  };
  return (
    <div className={styles.dropdown_container}>
      <div className={styles.toggle_button} onClick={toggleDropdown}>
        <MdArrowDropDown />
      </div>
      {isOpen && (
        <div className={styles.dropdown_content}>
          {recentProjects ? (
            <>
              {recentProjects.length > 0 ? (
                <ul className={styles.projectlist}>
                  {recentProjects.map((pro, key) => (
                    <li>{pro}</li>
                  ))}
                </ul>
              ) : (
                "no recent projects"
              )}
            </>
          ) : (
            "loading..."
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
