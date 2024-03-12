import DashboardLayout from "../../components/Supervisor_view/DashboardLayout/DashboardLayout";
import styles from "./Task.module.css";
import Taskdisplay from "./components/Taskdisplay/Taskdisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";

const Task = () => {
  const currentUser = useContext(AuthContext);
  return (
    <DashboardLayout
      title="Add Task"
      className={styles.task}
      user={currentUser.user}
    >
      {currentUser.user ? <Taskdisplay /> : <div>Loading...</div>}
    </DashboardLayout>
  );
};

export default Task;
