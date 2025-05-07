import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function ImageGallery() {
  const images = [
    { src: "/websiteimages/giffsinglesuite.jpg", alt: "Single Suite" },
    { src: "/websiteimages/giffsuitesingle.jpg", alt: "Suite Single" },
    { src: "/websiteimages/giff.jpg", alt: "Gifford Exterior" },
    { src: "/websiteimages/giffbathroom.jpg", alt: "Bathroom" },
    { src: "/websiteimages/giffkitchen.jpg", alt: "Kitchen" },
    { src: "/websiteimages/gifflaundry.jpg", alt: "Laundry" },
    { src: "/websiteimages/giffkitchenet.jpg", alt: "Kitchenette" },
    { src: "/websiteimages/gifftrash.jpg", alt: "Trash Room" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {/* Thumbnail Layout on Main Page */}
      <div className={styles.thumbnailGrid}>
        <div className={styles.leftBigImage}>
          <Image
            src={images[0].src}
            alt={images[0].alt}
            onClick={() => openModal(images[0])}
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </div>
        <div className={styles.rightSmallImages}>
          <Image
            src={images[1].src}
            alt={images[1].alt}
            onClick={() => openModal(images[1])}
            width={500}
            height={250}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <Image
            src={images[2].src}
            alt={images[2].alt}
            onClick={() => openModal(images[2])}
            width={500}
            height={250}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Modal with Large Image and Gallery */}
      {isModalOpen && selectedImage && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.modalCloseButton} onClick={closeModal}>
              &times;
            </span>

            {/* Large Preview Image */}
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className={styles.modalFullImage}
              style={{
                maxWidth: "90vw",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 20px",
                borderRadius: "8px",
              }}
            />

            {/* Thumbnails inside the modal */}
            <div
              className={styles.modalGallery}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {images.map((img) => (
                <div
                  key={img.src}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    border:
                      img.src === selectedImage.src
                        ? "3px solid white"
                        : "2px solid gray",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={80}
                    height={80}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
