/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const developers = [
  {
    name: "Ashley",
    image: "/devs/ashley.jpeg",
    description: "Ashley's favorite dorm is Lang.",
  },
  {
    name: "Danny",
    image: "/devs/danny.jpeg",
    description: "Danny would suggest you stay in LaForce.",
  },
  {
    name: "Jackson",
    image: "/devs/jackson.jpeg",
    description: "Jackson loves living in Hadley.",
  },
  {
    name: "Moon",
    image: "/devs/moon.jpeg",
    description: "Moon will give you a tour of her favorite dorm, Gifford.",
  },
  {
    name: "Swikriti",
    image: "/devs/swikriti.jpeg",
    description: "Swikriti is biased towards Allen.",
  },
  {
    name: "Will",
    image: "/devs/will.jpeg",
    description: "Will's love for Ridgeline is immense.",
  },
];

export default function About() {
  const [selectedDev, setSelectedDev] = useState(null);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya&family=Merriweather&display=swap"
          rel="stylesheet" //Loaded font only for this page which gave lint errors, so it I have disabled it at the top
        />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titleAboutPage}>About Us</h1>
        {/* Top section split left/right */}
        <div className={styles.topSection}>
          <div className={styles.leftColumn}>
            <div className={styles.descriptionAboutPage}>
              <p>
                🏠&nbsp; <strong>MiddDorms</strong> is an online housing rating
                system that allows current Middlebury College students (yes,
                you!) to share their reviews of your housing experiences. It
                also provides valuable insights into dorm buildings, helping you
                make more informed choices during room selection.
              </p>
              <p>
                You can browse different dorms and see key ratings- making it
                easier to find a room that fits your lifestyle and needs!
              </p>
            </div>
          </div>

          <div className={styles.rightCardWrapper}>
            <div className={styles.stickyNote}>
              <h3>Features</h3>
              <ul>
                <p>🛏️&nbsp; Browse reviews for campus dorms</p>
                <p>💡&nbsp; Submit your own ratings and reviews</p>
                <p>🔍&nbsp; See dorm amenities and features</p>
              </ul>
            </div>
            <div className={styles.stickyNote}>
              <h3>Disclaimer</h3>
              <p>MiddDorms is not affiliated with Middlebury College.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <p className={styles.teamIntro}>
            Brought to you by a passionate and curious group of Middlebury
            College students who want you to find your next perfect home! 💙✨
          </p>
          <h2 className={styles.meetTheTeamHeading}>Meet the Team</h2>
          <div className={styles.teamGrid}>
            {developers.map((dev) => (
              <div
                key={dev.name}
                className={`${styles.card} ${
                  selectedDev?.name === dev.name ? styles.active : ""
                }`}
                onClick={() =>
                  setSelectedDev(selectedDev?.name === dev.name ? null : dev)
                }
              >
                <Image
                  src={dev.image}
                  alt={dev.name}
                  className={styles.avatar}
                  width={200}
                  height={200}
                />
                <div className={styles.nameOverlay}>{dev.name}</div>
                {selectedDev?.name === dev.name && (
                  <div className={styles.descriptionOverlay}>
                    <p>{dev.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
