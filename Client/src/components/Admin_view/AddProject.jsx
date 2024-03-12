import { useContext, useState } from "react";
import styles from "./Admin_addproject.module.css";
import { IoAddSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import axios from "axios";
import AuthContext from "../LoginPage/AuthProvider/AuthProvider";

function AddProject() {
  const [addProject, setAddProject] = useState(false);
  const [options, setOptions] = useState([]);
  const currentUser = useContext(AuthContext);
  console.log(currentUser.user);
  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
  };

  const debouncedLoadOptions1 = debounce(async (searchValue, callback) => {
    try {
      const link = `http://localhost:8000/api/v1/user/?email=${searchValue}&role=student`;

      const response = await axios.get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });

      if (response.data.status === "success") {
        const newOptions = response.data.data.users.map((user) => {
          return {
            label: user.email,
            value: user._id,
          };
        });
        console.log(searchValue, newOptions);
        callback(newOptions);
        setOptions(newOptions);
        console.log(options);
      } else {
        console.log("No search found");
      }
    } catch (error) {
      alert(error);
    }

    console.log("loadOptions", searchValue, options);
  }, 1000);
  const debouncedLoadOptions2 = debounce(async (searchValue, callback) => {
    try {
      const link = `http://localhost:8000/api/v1/user/?email=${searchValue}&role=supervisor`;

      const response = await axios.get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });

      console.log(response);

      if (response.data.status === "success") {
        const newOptions = response.data.data.users.map((user) => {
          return {
            label: user.email,
            value: user._id,
          };
        });
        console.log(searchValue, newOptions);
        callback(newOptions);
        setOptions(newOptions);
        console.log(options);
      } else {
        console.log("No search found");
      }
    } catch (error) {
      alert(error);
    }

    console.log("loadOptions", searchValue, options);
  }, 1000);

  const loadOptions1 = (searchValue, callback) => {
    debouncedLoadOptions1(searchValue, callback);
  };
  const loadOptions2 = (searchValue, callback) => {
    debouncedLoadOptions2(searchValue, callback);
  };

  const inputs = [
    {
      id: 1,
      name: "ProjectTitle",
      label: "Project Title",
      placeholder: "Enter Project Name",
      type: "text",
      error: "You must enter a name",
    },

    {
      id: 2,
      name: "Semester",
      label: "Semester",
      placeholder: "Semester",
      type: "select",
      error: "ff",
    },

    {
      id: 3,
      name: "TeamMember",
      label: "Team Members",
      placeholder: "Choose Team Members",
      type: "multiselect",
      error: "Choose Team Members",
    },
    {
      id: 4,
      name: "Supervisor",
      label: "Supervisor",
      placeholder: "Choose a Supervisor",
      type: "select",
      error: "Choose a Supervisor",
    },
    {
      id: 5,
      name: "SubmissionDate",
      label: "Submission",
      placeholder: "Choose a Supervisor",
      type: "date",
      error: "Choose a Supervisor",
    },
  ];
  const [values, setValues] = useState({
    ProjectTitle: "",
    Semester: "",
    SubmissionDate: "",
  });

  const initialValues = {
    ProjectTitle: "",
    Semester: "",
    SubmissionDate: "",
  };

  const [supervisor, setSupervisor] = useState("");
  const [members, setMembers] = useState([]);

  const handleChangeSelect = (e) => {
    setSupervisor(e.value);
  };

  const handleChangeMultiSelect = (e) => {
    console.log(e);
    setMembers(e.map((obj) => obj.value));
    console.log(members);
  };

  const onChange = (e) => {
    console.log(e);
    setValues(() => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const { ProjectTitle, Semester, SubmissionDate } = values;

    const response = await axios.post(
      "http://localhost:8000/api/v1/project",
      {
        name: ProjectTitle,
        semester: parseInt(Semester, 10), // Parse to integer
        submissionDate: SubmissionDate,
        supervisor,
        members,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );

    const data = response;
    console.log(data);
    if (data.data.status === "success") {
      const message = "Submitted";
      setSupervisor("");
      setMembers([]);
      setValues(initialValues);

      alert(message);
    } else {
      const message = "Failed to submit";
      alert(message);
    }
  }

  return (
    <div className={styles.adminprojectcontainer}>
      {!addProject ? (
        <div className={styles.admin_addproject}>
          <div
            className={styles.addicon}
            onClick={() => setAddProject(!addProject)}
          >
            <IoAddSharp />
          </div>
          <div className={styles.addmessage}>Add a new project</div>
        </div>
      ) : (
        <div className={styles.projectform}>
          <div className={styles.formcontent}>
            <div className={styles.cross}>
              <MdClose
                className={styles.crossBtn}
                onClick={() => handlequit({ setAddProject, addProject })}
              />
            </div>
            <h2 className={styles.addformheading}>Add Project Info</h2>
            <form
              className={styles.projectdetails}
              onSubmit={(e) => handleSubmit(e)}
            >
              {inputs.map((input) => (
                <Inputs
                  input={input}
                  key={input.id}
                  onChange={onChange}
                  handleChangeSelect={handleChangeSelect}
                  handleChangeMultiSelect={handleChangeMultiSelect}
                  loadOptions1={loadOptions1}
                  loadOptions2={loadOptions2}
                />
              ))}

              <input
                type="submit"
                className={styles.adminsubmit}
                onClick={handleSubmit}
              ></input>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Inputs({
  input,
  onChange,
  handleChangeMultiSelect,
  handleChangeSelect,
  loadOptions1,
  loadOptions2,
}) {
  return (
    <>
      <div key={input.id} className={styles.inputboxes}>
        <div className={styles.inputlabel}>{input.label}</div>
        {input.type === "select" ? (
          <>
            {input.name === "Supervisor" ? (
              <>
                <AsyncSelect
                  loadOptions={loadOptions2}
                  className={styles.multiselect}
                  onChange={handleChangeSelect}
                  placeholder={"Select Supervisor"}
                  required
                />
              </>
            ) : (
              <>
                <select
                  className={styles.studentsemester}
                  onChange={onChange}
                  name={input.name}
                  required
                >
                  <option value="" hidden>
                    Choose an option
                  </option>
                  <option>1st </option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                  <option>5th</option>
                  <option>6th</option>
                  <option>7th</option>
                  <option>8th</option>
                </select>
              </>
            )}
          </>
        ) : input.type === "multiselect" ? (
          <AsyncSelect
            loadOptions={loadOptions1}
            isMulti
            className={styles.multiselect}
            onChange={handleChangeMultiSelect}
            placeholder={"Select Team Members"}
            required
          />
        ) : (
          <input
            className={styles.addProjectIinputtext}
            type={input.type}
            placeholder={input.placeholder}
            key={input.id}
            onChange={onChange}
            name={input.name}
            required
          />
        )}
      </div>
    </>
  );
}

function handlequit({ setAddProject, addProject }) {
  setAddProject(!addProject);
}

export default AddProject;
