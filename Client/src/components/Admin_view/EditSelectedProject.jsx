import AsyncSelect from "react-select/async";
import styles from "./EditSelectedProject.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";

const LoadingButton = ({ children, isloading, onClick, value }) => {
  const [loading, setLoading] = useState(isloading);

  return (
    <>
      <button
        style={{ backgroundColor: "red" }}
        onClick={(e) => {
          console.log(e.target);
          setLoading(true); // Set loading to true when the button is clicked
          onClick(e, value);
        }}
        disabled={loading} // Disable the button when loading
      >
        {loading ? "loading..." : children}
      </button>
    </>
  );
};

let supervisorPlaceholder, teamPlaceholder;
async function Project({
  id,
  setProjectName,
  setSemester,
  setDate,
  setSupervisor,
  setMembers,
  setDefaultMembersOptions,
}) {
  try {
    const link = `http://localhost:8000/api/v1/project/${id}`;

    const response = await axios.get(link, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    if (response.data.status === "success") {
      setProjectName(() => response.data.data.project.name);
      setDate(
        () =>
          new Date(response.data.data.project.submissionDate)
            .toISOString()
            .split("T")[0] //Review this
      );
      setSemester(() => response.data.data.project.semester);
      supervisorPlaceholder = response.data.data.project.supervisor.email;
      setSupervisor(() => response.data.data.project.supervisor._id);
      setMembers(() => response.data.data.project.members);
      const d = response.data.data.project.members.map((mem) => {
        return { label: mem.email, value: mem._id };
      });

      setDefaultMembersOptions(d);
    }
  } catch (err) {
    console.log(err);
  }
}

function EditSelectedProject() {
  const [projectName, setProjectName] = useState("");
  const [semester, setSemester] = useState("");
  const [Date, setDate] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [members, setMembers] = useState([]);
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [defaultMembersOptions, setDefaultMembersOptions] = useState([]);
  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
    setMembers(selectedOption);
  };
  const handleChangeSelect = (e) => {
    setSupervisor(e.value);
    console.log(supervisor);
  };
  const handleChangeMultiSelect = (e) => {
    console.log(e);
    setMembers(e.map((obj) => obj.value));
    console.log(members);
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function submitInfoProject(e) {
    e.preventDefault();
    console.log(`id received ${id}`);
    const link = `http://127.0.0.1:8000/api/v1/project/${id}`;
    try {
      const response = await axios.patch(
        link,
        { name: projectName, semester: semester, submissionDate: Date },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log(response);
      alert("Changes Saved");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  }
  async function removeMember(e, memberId) {
    e.preventDefault();
    const link = `http://127.0.0.1:8000/api/v1/project/${id}/remove-member`;

    try {
      const response = await axios.patch(
        link,
        {
          memberToRemove: memberId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );

      setDefaultMembersOptions((prevOptions) =>
        prevOptions.filter((mem) => mem.value !== memberId)
      );
    } catch (error) {
      console.error("Error removing member:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  }

  async function ChangeSupervisor() {
    const link = `http://127.0.0.1:8000/api/v1/project/${id}/add-supervisor`;
    try {
      const response = await axios.patch(
        link,
        {
          supervisor: supervisor,
        },

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  async function RemoveSupervisor() {
    const link = `http://127.0.0.1:8000/api/v1/project/${id}/remove-supervisor`;
    try {
      const response = await axios.patch(
        link,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      alert("Supervisor Changed");
    } catch (err) {
      console.log(err);
    }
  }

  async function submitChangeSupervisor() {
    await RemoveSupervisor();
    await ChangeSupervisor();
  }

  async function submitTeam(e) {
    e.preventDefault();

    const response = await axios.patch(
      `http://127.0.0.1:8000/api/v1/project/${id}/add-members`,
      {
        newMembers: members,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    const d = response.data.data.project.members.map((mem) => {
      return {
        label: mem.email,
        value: mem._id,
      };
    });
    setDefaultMembersOptions(d);
  }
  const debouncedLoadOptions1 = debounce(async (searchValue, callback) => {
    try {
      const link = `http://localhost:8000/api/v1/user/?email=${searchValue}&role=student`;

      const response = await axios.get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });

      if (response.data.status === "success") {
        const addedMembersIds = members.map((mem) => mem.value);
        const currentUserIds = defaultMembersOptions.map((mem) => mem.value);
        const newOptions = [];
        response.data.data.users.forEach((user) => {
          if (!currentUserIds.includes(user._id)) {
            newOptions.push({ label: user.email, value: user._id });
          }
        });
        callback(newOptions);
        setOptions(newOptions);
      } else {
        console.log("No search found");
      }
    } catch (error) {
      alert(error);
    }
  }, 1000);
  const debouncedLoadOptions2 = debounce(async (searchValue, callback) => {
    try {
      const link = `http://localhost:8000/api/v1/user/?email=${searchValue}&role=supervisor`;

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
        callback(newOptions);
        setOptions(newOptions);
      } else {
        console.log("No search found");
      }
    } catch (error) {
      alert(error);
    }
  }, 1000);

  const loadOptions1 = (searchValue, callback) => {
    debouncedLoadOptions1(searchValue, callback);
  };
  const loadOptions2 = (searchValue, callback) => {
    debouncedLoadOptions2(searchValue, callback);
  };

  useEffect(() => {
    Project({
      id,
      setProjectName,
      setSemester,
      setDate,
      setSupervisor,
      setMembers,
      setDefaultMembersOptions,
    });
  }, []);
  let d = defaultMembersOptions;
  return (
    <div className={styles.edit_profile_form_container}>
      <h1 className={styles.heading}>Edit Profile</h1>
      <h2 className={styles.subheading}>Basic Information</h2>
      <div className={styles.form_section}>
        <form className={styles.form1} onSubmit={submitInfoProject}>
          <label className={styles.label}>Project Title</label>
          <input
            type="text"
            className={styles.input}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          ></input>
          <label className={styles.label}>Semester</label>
          <select
            className={styles.input}
            onChange={(e) => setSemester(e.target.value)}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <option
                key={index + 1}
                value={index + 1}
                selected={semester === index + 1}
              >
                {index + 1}
              </option>
            ))}
          </select>

          <label className={styles.label}>Date</label>
          <input
            type="date"
            className={styles.input}
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <div className={styles.submit}>
            {console.log(`id is ${id}`)}
            <button type="submit" className={styles.submitbtn} value="Change">
              Save Changes
            </button>
          </div>
        </form>
        <hr />

        <h1 className={styles.heading}>Critical Section</h1>
        <h2 className={styles.subheading}>Change Supervisor</h2>
        <div className={styles.form_section}>
          <form className={styles.form2} onSubmit={handleSubmit}>
            <AsyncSelect
              loadOptions={loadOptions2}
              onChange={handleChangeSelect}
              placeholder={supervisorPlaceholder}
            />
            <div className={styles.submit}>
              <button
                type="submit"
                className={styles.submitbtn}
                onClick={submitChangeSupervisor}
              >
                Change Supervisor
              </button>
            </div>
          </form>
          <h2 className={styles.subheading}>Add New Team Members</h2>
          <form className={styles.form3} onSubmit={submitTeam}>
            {console.log(d)}
            <AsyncSelect
              isMulti
              loadOptions={loadOptions1}
              onChange={handleChangeMultiSelect}
            />
            <div className={styles.submit}>
              <button
                type="submit"
                className={styles.submitbtn}
                value="Change Team Members"
              >
                Add Members
              </button>
            </div>
          </form>
          <form
            className={styles.removeTeamMembers}
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2 className={styles.labelRemove}>Remove Team Members</h2>
            {console.log(defaultMembersOptions.map((mem) => mem.label))}
            <ul className={styles.addedmembers}>
              {defaultMembersOptions.map((mem) => (
                <li key={mem.value}>
                  {mem.label}
                  <span className={styles.removebtn}>
                    {" "}
                    {console.log(mem)}
                    <LoadingButton
                      isloading={false}
                      onClick={removeMember}
                      value={mem.value}
                    >
                      Remove
                    </LoadingButton>
                  </span>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditSelectedProject;
