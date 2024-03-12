import { useContext, useEffect } from "react";
import styles from "./StudentDashboard.module.css";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";

const StudentDashboard = () => {
  const currentUser = useContext(AuthContext);
  console.log("student dashboard");
  // useEffect(() => {
  //   currentUser.getUser();
  // }, []);
  return currentUser.user ? (
    <StdDashboardLayout
      title="Dashboard"
      user={currentUser.user}
    ></StdDashboardLayout>
  ) : (
    <div>loading...</div>
  );
};

export default StudentDashboard;
