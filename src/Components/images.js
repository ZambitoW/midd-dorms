
import { useState } from "react";
import "./styles.css"; 
import ImageSlideshow from "@/Components/images";

const imageList = [
    "/websiteimages/gifftrash.jpg",
    "/websiteimages/giff.jpg",
    "/websiteimages/giffbathroom.jpg",
    "/websiteimages/giffkitchen.jpg",
    "/websiteimages/gifflaundry.jpg",
    "/websiteimages/giffsinglesuite.jpg",
    "/websiteimages/giffsuitesingle.jpg",
    "/websiteimages/giffkitchenet.jpg"
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
    <div className="slideshow-container" style={{ textAlign: "center" }}>
      <img
        src={imageList[index]}
        alt="Slide"
        style={{
            width: "100%",
            maxWidth: "1000px", 
            height: "auto",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
          }}
      />
      <div>
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
}
