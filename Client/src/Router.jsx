import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Errorpage from "./pages/Errrorpage/Errorpage";
import Adminaddproject from "./pages/Adminaddproject/Adminaddproject";
import Admineditproject from "./pages/Admineditproject/Admineditproject";
import AdmineditSelectedproject from "./pages/Admineditproject/AdmineditSelectedproject";
import Adminprojectdetails from "./pages/Adminprojectsdetails/Adminprojectsdetails";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Chat from "./pages/Chat/JoinPage";
import Reports from "./pages/Reports/Reports";
import Logsheet from "./pages/Logsheet/Logsheet";
import Members from "./pages/Members/Members";
import EditProfile from "./pages/EditProfile/EditProfile";
import Adminsettings from "./pages/Adminsettings/Adminsettings";
import Task from "./pages/Task/Task";
import Calendar from "./pages/Calendar/Calendar";
import { useContext } from "react";
import AuthContext from "./components/LoginPage/AuthProvider/AuthProvider";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import StudentMembers from "./pages/StudentMembers/StudentMembers";
import StudentReports from "./pages/StudentReports/StudentReports";
import StudentTask from "./pages/StudentTask/StudentTask";
import StudentLogsheet from "./pages/StudentLogsheet/StudentLogsheet";
import StudentEditProfile from "./pages/StudentEditProfile/StudentEditProfile";
import StudentCalendar from "./pages/StudentCalendar/StudentCalendar";
// import Chatdisplay from "./pages/Chat/components/Chatdisplay/Chatdisplay";
import ChatPage from "./pages/Chat/ChatPage/ChatPage";
import JoinPage from "./pages/Chat/JoinPage/JoinPage";
import StdJoinPage from "./pages/StudentChat/StdJoinPage/StdJoinPage";
import StdChatPage from "./pages/StudentChat/StdChatPage/StdChatPage";

function Router() {
  const currentUser = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage signUpActive={false} signinActive={false} />}
        />
        {/* {!currentUser.user && (<> */}
        <Route
          path="signup"
          element={<LoginPage signUpActive={true} signinActive={false} />}
        />
        <Route
          path="login"
          element={<LoginPage signUpActive={false} signinActive={true} />}
        />
        {/* </>)} */}
        {/* {currentUser.user?.role === "admin" && (<> */}
        <Route path="admin" element={<AdminPage />}>
          <Route path="addproject" element={<Adminaddproject />} />
          <Route path="editproject" element={<Admineditproject />}></Route>
          <Route
            path="adminprojectdetails"
            element={<Adminprojectdetails />}
          ></Route>
          <Route
            path="editproject/:id"
            element={<AdmineditSelectedproject />}
          />
          <Route path="settings" element={<Adminsettings />} />
        </Route>
        {/* </>) */}
        {/* } */}
        <Route path="*" element={<Errorpage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/chat" element={<JoinPage />} />
        <Route path="/logsheet" element={<Logsheet />} />
        <Route path="/members" element={<Members />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/task" element={<Task />} />
        <Route path="/calendar" element={<Calendar />} />
        {/* <Route path="/join" element={<Join />} /> */}
        <Route path="/groupchat" element={<ChatPage />} />

        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentreports" element={<StudentReports />} />
        <Route path="/studentchat" element={<StdJoinPage />} />
        <Route path="/studentgroupchat" element={<StdChatPage />} />
        <Route path="/studentlogsheet" element={<StudentLogsheet />} />
        <Route path="/studentmembers" element={<StudentMembers />} />
        <Route path="/studenteditprofile" element={<StudentEditProfile />} />
        <Route path="/studenttask" element={<StudentTask />} />
        <Route path="/studentcalendar" element={<StudentCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
