import styles from "./StudentMembers.module.css";
import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import StudentMembersdisplay from "./components/StudentMembersdisplay/StudentMembersdisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const StudentMembers = () => {
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
    <StdDashboardLayout
      title="Project Members"
      className={styles.members}
      user={currentUser.user}
    >
      {activeProject ? (
        <StudentMembersdisplay members={activeProject.members} />
      ) : (
        <div>loading...</div>
      )}
    </StdDashboardLayout>
  );
};
export default StudentMembers;
