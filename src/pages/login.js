import { signIn } from "next-auth/react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function LoginPage() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const router = useRouter();
  const alertShown = useRef(false);

  useEffect(() => {
    if (router.query.alert === "1" && !alertShown.current) {
      alert("You must be logged in to view that page.");
      alertShown.current = true;
      router.replace("/login", undefined, { shallow: true });
    }
  }, [router]);

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
