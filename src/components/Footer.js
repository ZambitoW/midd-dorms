import { useEffect, useState } from "react";
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
            <h4>Coming Soon</h4>
            <p>Woah look, information</p>
          </div>

          <div className={styles.column}>
            <h4>Stuff</h4>
            <p>Maybe github links? or something</p>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© Middlebury Dorms</p>
      </div>
    </footer>
  );
}
