import Router from "./Router";
import "./App.css";

import { AuthContextProvider } from "./components/LoginPage/AuthProvider/AuthProvider";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
