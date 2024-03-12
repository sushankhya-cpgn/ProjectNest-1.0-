import styles from "./StudentEditProfile.module.css";
import { useState, useEffect, useContext } from "react";
import StdDashboardLayout from "../../components/Student_view/StdDashboardLayout/StdDashboardLayout";
import StudentEditProfiledisplay from "./components/StudentEditProfiledisplay/StudentEditProfiledisplay";
import AuthContext from "../../components/LoginPage/AuthProvider/AuthProvider";

const StudentEditProfile = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  return (
    <StdDashboardLayout title="Edit Profile" user={currentUser.user}>
      {!currentUser.user ? (
        "loading"
      ) : (
        <StudentEditProfiledisplay currentUser={currentUser} />
      )}
    </StdDashboardLayout>
  );
};

export default StudentEditProfile;
