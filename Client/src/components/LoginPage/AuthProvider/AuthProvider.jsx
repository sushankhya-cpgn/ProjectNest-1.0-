import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/token/${localStorage.getItem(
          "jwtToken"
        )}`
      );
      if (response.data.status !== "success") {
        setUser(undefined);
        return;
      }
      setUser(response.data.user);
    } catch (e) {
      setUser(undefined);
    }
  };

  return (
    <AuthContext.Provider value={{ user, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
