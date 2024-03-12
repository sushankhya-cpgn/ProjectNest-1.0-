import styles from "./Navbar.module.css";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import AccountSection from "./AccountSection";
import AdminNotification from "./AdminNotification";

function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <li>
          <Logo />
        </li>
        <li className={styles.search_section}>
          <Searchbar />
        </li>
        <li>
          <AdminNotification />
        </li>
        <li>
          <AccountSection />
        </li>
      </nav>
    </div>
  );
}
export default Navbar;
