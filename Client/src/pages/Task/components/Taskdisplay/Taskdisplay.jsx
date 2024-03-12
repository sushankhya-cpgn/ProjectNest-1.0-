import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Taskdisplay.module.css";

const Taskdisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasActiveLogsheet, setHasActiveLogsheet] = useState(undefined);
  const [taskData, setTaskData] = useState({
    assignTasks: [],
  });
  const [activeProject, setActiveProject] = useState(undefined);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/projects`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        if (response.data.status === "success") {
          await fetchCurrentProject(response.data.projects[0]._id);
          await fetchProjectLogsheet(response.data.projects[0]._id);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const fetchCurrentProject = async (id) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/project/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        if (response.data.status === "success") {
          setActiveProject(response.data.data.project);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const fetchProjectLogsheet = async (id) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/project/${id}/log-sheet`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        if (response.data.status === "success") {
          //get active project logsheet'
          if (response.data.logSheets.find((log) => log.active)) {
            setHasActiveLogsheet(true);
          } else {
            setHasActiveLogsheet(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  const nextWeek = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 7);
    setCurrentDate(nextDate);
  };

  const prevWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 7);
    setCurrentDate(prevDate);
  };

  const handleAssignTaskChange = (e, index) => {
    const updatedTasks = [...taskData.assignTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      assignTask: e.target.value,
    };
    setTaskData({ ...taskData, assignTasks: updatedTasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    const submitData = Object.entries(values).map((obj) => {
      return {
        assignedTo: obj[0],
        assignedTasks: [obj[1]],
      };
    });
    console.log(submitData);
    try {
      const token = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/project/${activeProject?._id}/log-sheet/${
          currentDate.toISOString().split("T")[0]
        }`,
        { entries: submitData },
        config
      );
      console.log("Data sent to the backend:", response.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  const inputs = activeProject?.members.map((mem) => {
    return {
      id: mem._id,
      name: "Assigned Task",
      label: `${mem.firstName} ${mem.lastName}`,
      placeholder: `Task for ${mem.firstName}`,
      type: "textarea",
    };
  });

  const [values, setValues] = useState({});
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {!activeProject ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.taskdisplay}>
            <div className={styles.tasknewdate}>
              <h2>Date: {currentDate.toDateString()}</h2>
            </div>
            <div className={styles.task_container}>
              {hasActiveLogsheet ? (
                "already a has logsheet"
              ) : (
                <form onSubmit={handleSubmit}>
                  <table className={styles.taskTable}>
                    <thead>
                      <tr>
                        <th>Members</th>
                        <th>Assign Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputs?.map((member, index) => (
                        <tr key={index}>
                          <td>
                            <label htmlFor={member.id}>{member.label}</label>
                          </td>
                          <td>
                            <textarea
                              id={member.id}
                              placeholder={member.placeholder}
                              // value={values[index]?.task || ""} // Use values[index]?.task or an empty string as a fallback
                              onChange={(e) => onChange(e, member.id)}
                            ></textarea>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </form>
              )}
            </div>
            <div className={styles.navigation_task}>
              <button onClick={prevWeek}>Previous Week</button>
              <button onClick={nextWeek}>Next Week</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Taskdisplay;
