import styles from "./LoginAndSignup.module.css";
import { jwtDecode } from "jwt-decode";
import Or from "../Or/Or";
import Button from "../Button/Button";
import TermsAndConditions from "../Termsandc/Termsandc";
import { Link } from "react-router-dom";
import Signupform from "../Signupform/Signupform";
import SignInform from "../SignInform/SignInform";
import CatchPhrase from "../CatchPharse/CatchPhrase";
import { useEffect } from "react";
import axios from "axios";
import AuthContext from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const LoginAndSignup = ({ clicked, setClicked, signin, setSignin }) => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCallbackResponse = (response) =>{
    console.log("response google credential from google", response.credential)
    const decoded = jwtDecode(response.credential);
    const userData = {
      email: decoded.email,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      aud: decoded.aud,
      photo: decoded.picture
    }
    axios
      .post("http://localhost:8000/api/v1/user/google-sign-up", userData)
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.token);
        currentUser.getUser();
        // axios.defaults.headers.common["Authorization"] =
        //   "Bearer" + res.data.token;
        // setUser({ auth: true, name: res.data.data.user.email });
        // if (res.data.data.user.role === "admin") {
        //   console.log("decoding Ravi");
        //   navigate("/admin");
        // }
        if (res.data.data.user.role === "student") {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  useEffect(()=>{
    /*global google*/ 
    google.accounts.id.initialize({
      client_id: "277690260012-e7nsqvajlkr2rso77bjireu6e25ra6sp.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
  }, [])

  google.accounts.id.renderButton(
    document.getElementById("signInWithGoogleBtn"),
    {theme: "outline", size: "large"}
  )
  function handleClick() {
    setClicked(!clicked);
  }
  function handleclickSignin() {
    setSignin(!signin);
  }
  return (
    <div className={styles.loginsection}>
      <div className={`${styles.loginpage} `}></div>

      <CatchPhrase />
      <div className={styles.signupbuttons}>
        {/* <Button id="signInWithGoogleBtn" className={`${styles.googlesignup} ${styles.createaccount}`}>
          <FcGoogle /> Signup with Google
        </Button> */}
        <div id="signInWithGoogleBtn"></div>
        <Or />
        <Link to={"/signup"}>
          <Button
            className={`${styles.createaccount}`}
            handleClick={handleClick}
          >
            Create Account
          </Button>
        </Link>
      </div>
      <TermsAndConditions />
      <div className={`${styles.login}`}>
        <h4>Already have an account?</h4>
        <Link to={"/login"}>
          <Button
            className={`${styles.loginbtn}`}
            handleClick={handleclickSignin}
          >
            Sign in
          </Button>
        </Link>
      </div>
      <Signupform clicked={clicked} handleClick={handleClick} />
      <SignInform clicked={signin} handleClick={handleclickSignin} />
    </div>
  );
};

export default LoginAndSignup;
