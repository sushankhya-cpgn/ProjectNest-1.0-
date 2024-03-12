import React from "react";
import styles from "./StdDashboardLayout.module.css";
import StdNavigationBar from "../StdNavigationBar/StdNavigationBar";
import StdSideBar from "../StdSideBar/StdSideBar";
import StdSubnavBar from "../StdSubnavBar/StdSubnavBar";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../LoginPage/AuthProvider/AuthProvider";

const StdDashboardLayout = ({ title, children, user }) => {
  const [activeProject, setActiveProject] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/projects`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        if (response.data.status === "success") {
          console.log(response.data);
          setActiveProject(response.data.projects[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  return (
    <div className={styles.dashboardlayout}>
      <StdNavigationBar user={user} activeProject={activeProject} />
      {activeProject ? (
        <>
          <div className={styles.sidensubnright}>
            <StdSideBar user={user} activeProject={activeProject} />
            <div className={styles.subnright}>
              <StdSubnavBar
                title={title}
                user={user}
                activeProject={activeProject}
              />
              <div className={styles.rightcontainer}>{children}</div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.noProjectDiv}>No project found</div>
      )}
    </div>
  );
};

export default StdDashboardLayout;
