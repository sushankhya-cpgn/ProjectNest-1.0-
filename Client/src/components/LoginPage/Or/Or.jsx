import styles from "./Or.module.css";
const Or = () => {
  return (
    <div className={styles.optiontext}>
      <div className={styles.underline}></div>
      <div className={`${styles.or}`}> OR</div>
      <div className={styles.underline}></div>
    </div>
  );
};

export default Or;
