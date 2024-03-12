import styles from "./Members.module.css";
import DashboardLayout from "../../components/Supervisor_view/DashboardLayout/DashboardLayout";
import Membersdisplay from "./components/Membersdisplay/Membersdisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Members = () => {
  const currentUser = useContext(AuthContext);

  const [activeProject, setActiveProject] = useState(undefined);

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
          await fetchCurrentProject(response.data.projects[0]._id);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const fetchCurrentProject = async (id) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/project/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        if (response.data.status === "success") {
          setActiveProject(response.data.data.project);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);
  return (
    <DashboardLayout
      title="Project Members"
      className={styles.members}
      user={currentUser.user}
    >
      {activeProject ? (
        <Membersdisplay members={activeProject.members} />
      ) : (
        <div>loading...</div>
      )}
    </DashboardLayout>
  );
};
export default Members;
