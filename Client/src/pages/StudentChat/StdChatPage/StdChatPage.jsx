import styles from "./StdChatPage.module.css";
import StdDashboardLayout from "../../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import AuthContext from "../../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";
import StdChatdisplay from "../components/StdChatdisplay/StdChatdisplay";

const StdChatPage = () => {
  const currentUser = useContext(AuthContext);
  return (
    <StdDashboardLayout
      title="Group Chat"
      className={styles.chat}
      user={currentUser.user}
    >
      <StdChatdisplay />
    </StdDashboardLayout>
  );
};

export default StdChatPage;
