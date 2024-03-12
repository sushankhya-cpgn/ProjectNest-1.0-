import styles from "./NavigationBar.module.css";

import { FiHelpCircle } from "react-icons/fi";
import Profiledropdown from "./components/Profiledropdown/Profiledropdown";
import Recent from "./components/Recent/Recent";
import { Link } from "react-router-dom";
import Searchbar from "../../Admin_view/Searchbar";

const NavigationBar = ({ user }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.imglogo}>
        <a href="#logo">
          <img src="/image/applogo.png" alt="app-logo" />
        </a>
      </div>
      <div className={styles.rightsec}>
        <ul className={styles.implist}>
          <li>
          <Link to="/dashboard">
            <a href="#dashboard">Dashboard</a>
          </Link>
          </li>
          <li>
            <a href="#recent">
              <Recent />
            </a>
          </li>
        </ul>
        <div className={styles.searchnavbar}>
          <Searchbar />
        </div>
        <ul className={styles.profilesec}>
          <li>
            <a href="#help">
              <FiHelpCircle />
            </a>
          </li>
          <li>
            <a href="#profile">
              <Profiledropdown
                userDetails={{
                  name: `${user?.firstName}`,
                  email: `${user?.email}`,
                }}
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
