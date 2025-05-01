import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/NavBar.module.css";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo_title} onClick={() => router.push("/")}>
        {}
        <picture>
          <source
            srcset="../logoBlue.png"
            media="(prefers-color-scheme: light)"
            alt="MiddDorms Logo"
            className={styles.logo}
            style={{ width: "60px", height: "auto" }}
          />

          <source
            srcset="../logoWhite.png"
            media="(prefers-color-scheme: dark)"
            alt="MiddDorms Logo"
            className={styles.logo}
            style={{ width: "60px", height: "auto" }}
          />

          <img
            src="../logoWhite.png"
            alt="MiddDorms Logo"
            className={styles.logo}
            style={{ width: "60px", height: "auto" }}
          />
        </picture>

        <span className={styles.title}>MiddDorms</span>
      </div>

      <div className={styles.about_profile}>
        <button
          onClick={() => router.push("/RateDormPage")}
          className={styles.about_button}
        >
          Write A Review
        </button>
        <button
          onClick={() => router.push("/about")}
          className={styles.about_button}
        >
          About Us
        </button>

        <div
          onClick={() => router.push("/user/ProfilePage")}
          className={styles.profile}
        >
          <picture>
            <source
              srcset="/loginLight.png"
              media="(prefers-color-scheme: light)"
              alt="Profile"
              style={{ width: "20px", height: "20px" }}
            />

            <source
              srcset="../loginDark.png"
              media="(prefers-color-scheme: dark)"
              alt="Profile"
              style={{ width: "20px", height: "20px" }}
            />

            <img
              src="../logoWhite.png"
              alt="Profile"
              style={{ width: "20px", height: "20px" }}
            />
          </picture>
        </div>
      </div>
    </nav>
  );
}
