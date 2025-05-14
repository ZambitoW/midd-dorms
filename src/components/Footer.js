import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScrollToTop = () => {
    console.log("Scroll to top clicked");

    window.scrollTo({ top: 0, behavior: "smooth" });

    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logoArea}>
          {isClient && (
            <div onClick={handleScrollToTop} style={{ cursor: "pointer" }}>
              <Image
                src="/logoWhite.png"
                alt="MiddDorms logo"
                width={80}
                height={80}
                className={styles.logoBottom}
              />
            </div>
          )}
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>Resources</h4>
            <ul>
              <li>
                <a
                  href="https://www.middlebury.edu/residential-life/fall-room-selection"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Housing Process
                </a>
              </li>
              <li>
                <a
                  href="https://middlebury.datacenter.adirondacksolutions.com/MIDDLEBURY_THDSS_PROD/navigation/student/my-screen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Housing Portal
                </a>
              </li>
              <li>
                <a
                  href="https://www.middlebury.edu/residential-life"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ResLife
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Feedback</h4>
            <ul>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScVgNCQWIgc_4dGBR8QeMFharzruPtQaDLkFo6PW3qvi9AJzA/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feedback Form
                </a>
              </li>
              <li />
              <li />
            </ul>
          </div>

          <div className={styles.column}>
            <h4>More Info</h4>
            <ul>
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© Middlebury Dorms</p>
      </div>
    </footer>
  );
}
