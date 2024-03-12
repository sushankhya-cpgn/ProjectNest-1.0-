import styles from "./Logsheet.module.css";
import DashboardLayout from "../../components/Supervisor_view/DashboardLayout/DashboardLayout";
import Logsheetdisplay from "./components/Logsheetdisplay/Logsheetdisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";

const Logsheet = () => {
  const currentUser = useContext(AuthContext);
  return (
    <DashboardLayout
      title="Logsheet"
      className={styles.logsheet}
      user={currentUser.user}
    >
      <Logsheetdisplay />
    </DashboardLayout>
  );
};

export default Logsheet;
