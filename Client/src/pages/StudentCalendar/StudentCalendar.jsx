import styles from "./StudentCalendar.module.css";
import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import StudentCalendardisplay from "./components/StudentCalendardisplay/StudentCalendardisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";

const Calendar = () => {
  const currentUser = useContext(AuthContext);
  return (
    <StdDashboardLayout
      title="Calendar"
      className={styles.calendar}
      user={currentUser.user}
    >
      <StudentCalendardisplay />
    </StdDashboardLayout>
  );
};

export default Calendar;
