import styles from "./StdJoinPage.module.css";
import StdDashboardLayout from "../../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import AuthContext from "../../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import StdJoin from "../components/StdJoin/StdJoin";

const StdJoinPage = () => {
  const currentUser = useContext(AuthContext);
  return (
    <StdDashboardLayout
      title="Group Chat"
      className={styles.chat}
      user={currentUser.user}
    >
      <StdJoin />
    </StdDashboardLayout>
  );
};

export default StdJoinPage;
