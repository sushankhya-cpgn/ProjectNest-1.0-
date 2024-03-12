import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import styles from "./StudentReports.module.css";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";
import StudentReportDisplay from "./components/StudentReportsdisplay/StudentReportsdisplay";

const Reports = () => {
  const currentUser = useContext(AuthContext);
  return (
    <StdDashboardLayout
      title="Project Report"
      className={styles.reports}
      user={currentUser.user}
    >
      <StudentReportDisplay />
    </StdDashboardLayout>
  );
};

export default Reports;
