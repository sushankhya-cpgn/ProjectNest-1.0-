import React from "react";
import styles from "./DashboardLayout.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import SideBar from "../SideBar/SideBar";
import SubnavBar from "../SubnavBar/SubnavBar";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../LoginPage/AuthProvider/AuthProvider";

const DashboardLayout = ({ title, children, user }) => {
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
        console.log(response);
        if (response.data.status === "success") {
          setActiveProject(response.data.projects[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);
  console.log(activeProject);

  return (
    <div className={styles.dashboardlayout}>
      <NavigationBar user={user} activeProject={activeProject} />
      {activeProject ? (
        <>
          <div className={styles.sidensubnright}>
            <SideBar user={user} activeProject={activeProject} />
            <div className={styles.subnright}>
              <SubnavBar
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

export default DashboardLayout;
