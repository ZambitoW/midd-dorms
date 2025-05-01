import { useRouter } from "next/router";
//import { useEffect } from "react";
import styles from "@/styles/NavBar.module.css";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo_title} onClick={() => router.push("/")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="../logo.jpeg"
          alt="MiddDorms Logo"
          className={styles.logo}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />

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
          <Image src="/login.png" alt="Profile" width={20} height={20} />
        </div>
      </div>
    </nav>
  );
}
