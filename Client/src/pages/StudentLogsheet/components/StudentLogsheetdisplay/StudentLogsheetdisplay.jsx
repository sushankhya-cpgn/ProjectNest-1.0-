import styles from "./StudentLogsheetdisplay.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const StudentLogsheetdisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeProject, setActiveProject] = useState(undefined);
  const [logsheetActive, setlogsheetActive] = useState(undefined);
  const [logdata, setlogData] = useState(undefined);
  if (logsheetActive && !logdata) {
    const data = {};
    logsheetActive.log.entries.forEach((ent) => {
      data[ent.assignedTo._id] = {
        assignedTasks: ent.assignedTasks[0],
        completedTasks: ent.completedTasks[0] || "",
        present: ent.present,
        remarks: ent.remarks || "",
      };
      setlogData(data);
    });
  }
  console.log(logdata);
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
          setlogsheetActive(response.data.logSheets.find((log) => log.active));
          // setlogsheetActive(response.data.logSheets);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  const handleRemarkChange = (e) => {
    console.log(e.target.id, e.target);
    setlogData({
      ...logdata,
      [e.target.id]: {
        ...logdata[e.target.id],
        remarks: e.target.value,
      },
    });
  };
  const handlePresenceChange = (e) => {
    console.log(e.target.id, e.target.checked);
    setlogData({
      ...logdata,
      [e.target.id]: {
        ...logdata[e.target.id],
        present: e.target.checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(logdata);
  };
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

  const onChange = (e) => {
    // setlogData({
    //   ...logdata,
    //   [e.target.id]: {
    //     assignedTask: e.target.
    //   }
    // })
  };
  return (
    <>
      {!activeProject ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.logsheetdisplay}>
            <div className={styles.logsheetdate}>
              <h2>Date: {logsheetActive?.date.split("T")[0]}</h2>
            </div>
            <div className={styles.logsheet_container}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <table className={styles.logTable}>
                  <thead>
                    <tr>
                      <th>Members</th>
                      <th>Assigned Task</th>
                      <th>Completed Task</th>
                      <th>Remarks</th>
                      <th>Presence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(logsheetActive)}
                    {logsheetActive?.log.entries.map((entry) => (
                      <tr>
                        <td>{`${entry.assignedTo.firstName} ${entry.assignedTo.lastName}`}</td>
                        <td>{`${entry.assignedTasks[0]}`}</td>
                        <td>{entry.completedTasks[0] || ""}</td>
                        <td>
                          <label
                            id={entry.assignedTo._id}
                            onChange={(e) => handleRemarkChange(e)}
                            className={styles.remarksInput}
                          />
                        </td>
                        <td>
                          <label
                            type="checkbox"
                            id={entry.assignedTo._id}
                            onChange={(e) => {
                              handlePresenceChange(e);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
              </form>
            </div>
            <div className={styles.navigationnew}>
              <button onClick={prevWeek}>Previous Week</button>
              <button onClick={nextWeek}>Next Week</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default StudentLogsheetdisplay;
