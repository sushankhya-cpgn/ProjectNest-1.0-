/* eslint-disable react/jsx-key */
import axios from "axios";
import styles from "./Admin_editproject.module.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import AuthContext from "../LoginPage/AuthProvider/AuthProvider";
import { RiDeleteBin6Line } from "react-icons/ri";

function EditProject() {
  const [projects, setProjects] = useState([]);

  const currentUser = useContext(AuthContext);
  const id = currentUser.user._id;

  useEffect(() => {
    ProjectList(setProjects);
  }, []);

  return (
    <div className={styles.adminprojectcontainer}>
      <div className={styles.edit_project}>
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            project={project}
            ProjectList={ProjectList}
            setProjects={setProjects}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ id, project, ProjectList, setProjects }) {
  const [del, setDel] = useState(false);
  async function deleteProject(id) {
    try {
      const link = `http://127.0.0.1:8000/api/v1/project/${id}`;
      const response = await axios.delete(
        link,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log(response);
      ProjectList(setProjects);
    } catch (err) {
      console.log(err);
    }
  }
  function toggleDelete() {
    setDel(!del);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className={styles.project_card}>
      <div className={styles.projectCardHeader}>
        <h3 className={styles.project_title}>{project.name}</h3>
        <div className={styles.edit_delete_icon}>
          <Link to={`/admin/editproject/${project._id}`}>
            <MdEditDocument />
          </Link>
          <RiDeleteBin6Line
            onClick={() => toggleDelete()}
            className={styles.deletebin}
          />
        </div>
      </div>

      {!del ? (
        <div className={styles.projectsemester}>
          <p className={styles.prow}>
            <span className={styles.labels}>Project Members:</span>
            {project.members.map((member, i, arr) =>
              i + 1 === arr.length
                ? `${member.firstName}`
                : `${member.firstName}, `
            )}
          </p>
          <p className={styles.prow}>
            {" "}
            <span className={styles.labels}>Semester:</span>
            {project.semester}
          </p>
          <p className={styles.prow}>
            <span className={styles.labels}>Project Supervisor:</span>
            {project.supervisor?.firstName}
          </p>
          <p className={styles.prow}>
            <span className={styles.labels}>Submission Date:</span>
            {`${new Date(project.submissionDate).getDay()}-${new Date(
              project.submissionDate
            ).getMonth()}-${new Date(project.submissionDate).getFullYear()}`}
          </p>
        </div>
      ) : (
        <>
          <form className={styles.delete} onSubmit={handleSubmit}>
            <p className={styles.warning}>
              Do you really want to delete the project?
            </p>
            <button
              className={styles.confirmDelete}
              onClick={() => deleteProject(id)}
            >
              Yes
            </button>
            <button className={styles.cancelDelete} onClick={toggleDelete}>
              No
            </button>
          </form>
        </>
      )}
    </div>
  );
}

async function ProjectList(setProjects) {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/project", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    console.log(response);
    setProjects(response.data.data.projects);
  } catch (err) {
    console.log(err);
  }
}

export default EditProject;
