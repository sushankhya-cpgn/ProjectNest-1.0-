import { useContext, useEffect } from "react";
import Navbar from "../../components/Admin_view/Navbar";
import Sidebar from "../../components/Admin_view/Sidebar";
import styles from "./AdminPage.module.css";
import { Outlet } from "react-router-dom";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";

function AdminPage() {
  const currentUser = useContext(AuthContext);
  return currentUser.user && currentUser.user.role === "admin" ? (
    <>
      {console.log(currentUser.user._id)}
      <Navbar />
      <div className={styles.pagesplit}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : (
    <>
      <div>You are not logged in as admin</div>
    </>
  );
}
export default AdminPage;
