import styles from "./StudentLogsheet.module.css";
import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import StudentLogsheetdisplay from "./components/StudentLogsheetdisplay/StudentLogsheetdisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";

const StudentLogsheet = () => {
  const currentUser = useContext(AuthContext);
  return (
    <StdDashboardLayout
      title="Logsheet"
      className={styles.logsheet}
      user={currentUser.user}
    >
      <StudentLogsheetdisplay />
    </StdDashboardLayout>
  );
};

export default StudentLogsheet;
