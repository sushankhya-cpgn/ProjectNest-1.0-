import { useState } from "react";
import styles from "./Signupform.module.css";
import { Link, Navigate } from "react-router-dom";

const Signupform = ({ clicked, handleClick }) => {
  const [values, setValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Firstname",
      error:
        "Name cannot have a number and should contain at least 3 characters",
      required: true,
      pattern: "^[A-Za-z]{3,100}$",
    },
    {
      id: 2,
      name: "middleName",
      type: "text",
      placeholder: "Middlename",
      error: "Name cannot have a number",
      pattern: "^[A-Za-z]{0,100}$",
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "Lastname",
      error:
        "Name cannot have a number  and should contain at least a character",
      required: true,
      pattern: "^[A-Za-z]{1,100}$",
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      error: "Please enter valid email address",
      required: true,
      pattern:
        " /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      error:
        "Password must be minimum eight characters, at least one letter and one number",
      required: true,
      pattern: `^(?=.*[a-zA-Z])(?=.*\\d).{8,}$`,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      error: "Enter same password to confirm password",
      required: true,
      pattern: values.password,
    },
  ];

  function handlecross() {
    setValues(initialValues);

    handleClick();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
    } = values;
    values;
    const response = await fetch("http://localhost:8000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    console.log(data);
    if (data.status === "success") {
      const message = "New account has been created";
      handleClick(!clicked);
      alert(message);
      Navigate("/")
    } else {
      const message = "Account with current email already exists";
      alert(message);
    }

    // <Link to="/"></Link>;
  }

  const onChange = (e) => {
    setValues(() => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(values);

  return (
    <div className={clicked ? `${styles.Signupform}` : `${styles.hidden}`}>
      <div className={styles.Signupform_quit}>
        <div className={styles.cross} >
          <Link to={"/"} onClick={handlecross} style={{ textDecoration: "none", color: "white" }}>
            &#10006;
          </Link>
        </div>
      </div>
      <h1 style={{ textAlign: "center", color: "azure" }}>
        {" "}
        Create An Account
      </h1>
      <form onSubmit={handleSubmit} className={styles.signUpFormForm}>
        {inputs.map((input) => (
          <InputItem
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            placeholder={input.placeholder}
          />
        ))}

        <div className={styles.submit}>
          <input type="submit" className={styles.submitbtn} onClick={() => handleSubmit }></input>
        </div>
      </form>
    </div>
  );
};

function InputItem(props) {
  const [focused, setFocused] = useState(false);
  function handlefocus() {
    setFocused(true);
  }
  return (
    <div className={styles.inputbox}>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name} //see
        required={props.required}
        pattern={props.pattern}
        onBlur={handlefocus}
        className={styles.signUpInputs}
        focused={focused.toString()}
      />
      <p className={styles.errorsection}>{props.error}</p>
    </div>
  );
}
export default Signupform;
