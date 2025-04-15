import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

const imageList = [
  "/websiteimages/gifftrash.jpg",
  "/websiteimages/giff.jpg",
  "/websiteimages/giffbathroom.jpg",
  "/websiteimages/giffkitchen.jpg",
  "/websiteimages/gifflaundry.jpg",
  "/websiteimages/giffsinglesuite.jpg",
  "/websiteimages/giffsuitesingle.jpg",
  "/websiteimages/giffkitchenet.jpg",
];

export default function ImageSlideshow() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="slideshow-container" styles={{ textAlign: "center" }}>
      <div>
        <Image
          src={imageList[index]}
          alt="Slide"
          width={500}
          height={500}
          style={{
            width: "50%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "8px",
            display: "block",
          }}
        />
        <button className={styles.secondary} onClick={prevSlide}>
          ←
        </button>
        <button className={styles.secondary} onClick={nextSlide}>
          →
        </button>
      </div>
    </div>
  );
}
