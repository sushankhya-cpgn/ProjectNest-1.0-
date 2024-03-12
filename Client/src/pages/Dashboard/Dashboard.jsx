import { useContext, useEffect } from "react";
import styles from "./Dashboard.module.css";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import DashboardLayout from "../../components/Supervisor_view/DashboardLayout/DashboardLayout";

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser.user);
  // useEffect(() => {
  //   currentUser.getUser();
  // }, []);
  return currentUser.user ? (
    <DashboardLayout
      title="Dashboard"
      user={currentUser.user}
    ></DashboardLayout>
  ) : (
    <div>loading</div>
  );
};

export default Dashboard;
