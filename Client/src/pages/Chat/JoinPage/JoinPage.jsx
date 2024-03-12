import styles from "./JoinPage.module.css";
import DashboardLayout from "../../../components/Supervisor_view/DashboardLayout/DashboardLayout";
import AuthContext from "../../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import Join from "../components/Join/Join";

const JoinPage = () => {
  const currentUser = useContext(AuthContext);
  return (
    <DashboardLayout
      title="Group Chat"
      className={styles.chat}
      user={currentUser.user}
    >
      <Join />
    </DashboardLayout>
  );
};

export default JoinPage;
