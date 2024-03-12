import styles from "./Recent.module.css";
import { useState, useContext } from "react";
import AuthContext from "../../../../LoginPage/AuthProvider/AuthProvider";
import axios from "axios";
const Recent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentProjects, setRecentProjects] = useState(undefined);
  const currentUser = useContext(AuthContext);

  const toggleRecent = () => {
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
        console.log(err);
        setRecentProjects([]);
      }
    };
    if (!isOpen) {
      fetchData();
    }
  };
  return (
    <div className={styles.dropdown_contrecent}>
      <div className={styles.toggle} onClick={toggleRecent}>
        <span>Recent</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown_contentrecent}>
          {recentProjects ? (
            <>
              {recentProjects.length > 0 ? (
                <ul className={styles.projectlist2}>
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

export default Recent;
