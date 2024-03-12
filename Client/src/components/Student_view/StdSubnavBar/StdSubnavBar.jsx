import styles from "./StdSubnavBar.module.css";
import { GoMention } from "react-icons/go";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notifications from "./components/Notifications/Notifications";

const StdSubnavBar = ({ title }) => {
  return (
    <div className={styles.subnavbar}>
      <div className={styles.headersection}>
        <h3 className={styles.dashhead}>{title}</h3>
        <ul className={styles.subnav}>
          <li className={styles.subnavlist}>
            <Link to="#">
              <Notifications />
              Notifications
            </Link>
          </li>
          <li className={styles.subnavlist}>
            <Link to="/calendar">
              <FaRegCalendarCheck />
              Calendar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StdSubnavBar;
