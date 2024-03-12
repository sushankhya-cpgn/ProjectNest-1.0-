import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import styles from "./StudentTask.module.css";
import StudentTaskdisplay from "./components/StudentTaskdisplay/StudentTaskdisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";

const StudentTask = () => {
  const currentUser = useContext(AuthContext);
  return (
    <StdDashboardLayout
      title="Task"
      className={styles.task}
      user={currentUser.user}
    >
      {currentUser.user ? <StudentTaskdisplay /> : <div>Loading...</div>}
    </StdDashboardLayout>
  );
};

export default StudentTask;
