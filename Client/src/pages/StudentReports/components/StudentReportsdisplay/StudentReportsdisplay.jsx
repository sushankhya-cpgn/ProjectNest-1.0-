import styles from "./StudentReportsdisplay.module.css";
import { GoMention } from "react-icons/go";
import { BsCalendar2Check } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const StudentReportsdisplay = () => {
  const [reportPdf, setReportPdf] = useState("");
  const [activeProject, setActiveProject] = useState(undefined);
  const [currentReport, setCurrentReport] = useState(undefined);
  const [fileUploading, setFileUploading] = useState(false);
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

    fetch();
  }, []);

  useEffect(() => {
    const fetchCurrentReport = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/project/${activeProject._id}/report`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          }
        );
        console.log(response.data);
        if (response.data.status === "success") {
          setCurrentReport(response.data.data.report);
        }
      } catch (e) {
        setCurrentReport(undefined);
        console.log(e);
      }
    };
    fetchCurrentReport();
  }, [activeProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileUploading(true);
    let formData = new FormData();
    formData.append("report", reportPdf);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/project/${activeProject._id}/report`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log(response);
      if (response.data.status === "success") {
        setFileUploading(false);
        setActiveProject({ ...activeProject });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    setReportPdf(e.target.files[0]);
  };
  return (
    <div className={styles.reportsdisplay}>
      <div className={styles.reportBtn}>
        {currentReport ? (
          <a
            href={"http://localhost:8000/public/report/" + currentReport}
            rel="noopener noreferrer"
            target="_blank"
            className={styles.reportview}
          >
            view report
          </a>
        ) : (
          "no report"
        )}
      </div>
      <div className="gantttxt">
        {activeProject ? (
          <form className={styles.reportscontainer} onSubmit={handleSubmit}>
            {currentReport ? (
              <h2 className={styles.reportheader}>
                Upload New Report From Here
              </h2>
            ) : (
              <h2 className={styles.reportheader}>Upload Your Report Here</h2>
            )}
            <input type="file" onChange={handleChange}></input>
            <button disabled={fileUploading} type="submit">
              {fileUploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

export default StudentReportsdisplay;
