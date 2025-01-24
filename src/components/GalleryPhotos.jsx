import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

// Styled Components
const GallerySection = styled.section`
  padding: 50px 20px;
  color: #fff;
  text-align: center;
`;

const GalleryTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adjust minmax for larger screens */
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }
`;

const GalleryItem = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

// Modal Accessibility
Modal.setAppElement("#root");

const GalleryPhotos = () => {
  const { t } = useTranslation();
  const title = t("galleryPhotos.title");
  const images = t("galleryPhotos.images", { returnObjects: true });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <GallerySection>
      <GalleryTitle>{title}</GalleryTitle>
      <GalleryGrid>
        {images.map((image, index) => (
          <GalleryItem key={index} onClick={() => openModal(image)}>
            <GalleryImage src={image} alt={`Gallery Image ${index + 1}`} />
          </GalleryItem>
        ))}
      </GalleryGrid>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          },
          content: {
            background: "transparent",
            border: "none",
            padding: 0,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <ModalImage src={currentImage} alt="Enlarged Image" />
      </Modal>
    </GallerySection>
  );
};

export default GalleryPhotos;