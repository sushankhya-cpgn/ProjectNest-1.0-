import EditProfiledisplay from "../../pages/EditProfile/components/EditProfiledisplay/EditProfiledisplay";
import styles from "./Settings.module.css";
import { useContext } from "react";
import AuthContext from "../LoginPage/AuthProvider/AuthProvider";
function Settings() {
  const currentUser = useContext(AuthContext);
  console.log(currentUser.user._id);
  return (
    <div className={styles.container}>
      <EditProfiledisplay currentUser={currentUser} />
    </div>
  );
}

export default Settings;
