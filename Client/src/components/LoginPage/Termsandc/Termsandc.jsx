import styles from "./Termsandc.module.css";
const TermsAndConditions = () => {
  return (
    <p className={`${styles.terms} ${styles.text}`}>
      By signing up, you agree to the{" "}
      <strong>Terms of Service and Privacy Policy</strong>, including Cookie
      Use.
    </p>
  );
};
export default TermsAndConditions;
