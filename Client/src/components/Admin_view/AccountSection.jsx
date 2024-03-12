import { useContext } from "react";
import styles from "./AccountSection.module.css";
import AuthContext from "../LoginPage/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

function AccountSection() {
  const currentUser = useContext(AuthContext);
  const logout = ()=>{
    localStorage.removeItem("jwtToken");

  }
  return (
    <div className={styles.accountsection}>
      <div>Hello, {currentUser.user?.firstName}</div>
      <img
        alt="photo"
        className="profilephoto"
        src="https://picsum.photos/200"
      ></img>
      <Link  onClick={logout} to="/">Logout</Link>
    </div>
  );
}

export default AccountSection;
