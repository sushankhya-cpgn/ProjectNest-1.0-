import styles from "./ChatPage.module.css";
import DashboardLayout from "../../../components/Supervisor_view/DashboardLayout/DashboardLayout";
import AuthContext from "../../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";
import Chatdisplay from "../components/Chatdisplay/Chatdisplay";

const ChatPage = () => {
  const currentUser = useContext(AuthContext);
  return (
    <DashboardLayout
      title="Group Chat"
      className={styles.chat}
      user={currentUser.user}
    >
      <Chatdisplay />
    </DashboardLayout>
  );
};

export default ChatPage;
