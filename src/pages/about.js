/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

const developers = [
  {
    name: "Ashley",
    image: "/devs/ashley.jpeg",
    description: "Ashley's favorite dorm is Lang.",
  },
  {
    name: "Danny",
    image: "/devs/danny.jpeg",
    description: "Danny would suggest you stay in Coffrin.",
  },
  {
    name: "Jackson",
    image: "/devs/jackson.jpeg",
    description: "Jackson loves living in Hadley.",
  },
  {
    name: "Moon",
    image: "/devs/moon.jpg",
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
            <p className={styles.descriptionAboutPage}>
              MiddDorms is an online housing rating system that allows current
              Middlebury College students to share their reviews of their
              housing experiences. It provides students with valuable
              information of dorm buildings and their room types to make more
              informed choices during room selection. MiddDorms allows students
              to browse through the different dorms and see their key ratings
              (noise, cleanliness, amenities) which might help them choose a
              dorm room more suited to their needs.
            </p>
          </div>

          <div className={styles.rightCardWrapper}>
            <div className={styles.stickyNote}>
              <h3>Features</h3>
              <ul>
                <li>Browse reviews for campus dorms</li>
                <li>Submit your own ratings and reviews</li>
                <li>See dorm amenities and features</li>
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
          <h2>Meet the Team</h2>
          <p style={{ padding: "2rem" }}>
            We are a passionate and curious group of Middlebury College students
            apart of the software development, CS 312, class!
          </p>
          <div className={styles.teamGrid}>
            {developers.map((dev) => (
              <div key={dev.name} className={styles.card}>
                <Image
                  src={dev.image}
                  alt={dev.name}
                  className={styles.avatar}
                  width={200}
                  height={200}
                />
                <div className={styles.nameOverlay}>{dev.name}</div>
                <div className={styles.descriptionOverlay}>
                  <p>{dev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
