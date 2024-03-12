import styles from "./CatchPhrase.module.css";
const CatchPhrase = () => {
  return (
    <>
      <span className={` ${styles.text} ${styles.subheading} ${styles.span}`}>
        Manage Your Project Conveniently Like Never Before
      </span>
      <div className={styles.join_message}>
        <h2 className={styles.text} style={{ width: "80%" }}>
          Join Today.
        </h2>
      </div>
    </>
  );
};

export default CatchPhrase;
