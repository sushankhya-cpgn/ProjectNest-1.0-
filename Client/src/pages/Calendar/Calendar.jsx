import styles from "./Calendar.module.css";
import DashboardLayout from "../../components/Supervisor_view/DashboardLayout/DashboardLayout";
import Calendardisplay from "./components/Calendardisplay/Calendardisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";
import { useContext } from "react";

const Calendar = () => {
  const currentUser = useContext(AuthContext);
  return (
    <DashboardLayout
      title="Calendar"
      className={styles.calendar}
      user={currentUser.user}
    >
      <Calendardisplay />
    </DashboardLayout>
  );
};

export default Calendar;
