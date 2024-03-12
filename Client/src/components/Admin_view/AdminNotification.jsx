import styles from "./AdminNotification.module.css";
import { IoNotificationsSharp } from "react-icons/io5";
function AdminNotification() {
  return (
    <div className={styles.notifications}>
      <IoNotificationsSharp />
    </div>
  );
}
export default AdminNotification;
