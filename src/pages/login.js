import { signIn } from "next-auth/react";
import styles from "@/styles/login.module.css";

export default function LoginPage() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Login to MiddDorms</h1>
        <h3>Please use your Middlebury College email</h3>
        <div className={styles.loginForm}>
          <button
            onClick={handleLogin}
            className={styles.loginButton}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              style={{ width: "20px", height: "20px" }}
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
