import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
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

// Sample images (Replace these paths with your actual image paths)
const images = [
  '/img/video/gym1thumb.jpg',
  '/img/video/gym1thumb.jpg',
  '/img/video/gym1thumb.jpg',
  '/img/video/gym1thumb.jpg',
  '/img/video/gym1thumb.jpg',
  '/img/video/gym1thumb.jpg',
];

Modal.setAppElement('#root'); // Important for accessibility

const GalleryPhotos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  return (
    <GallerySection>
      <GalleryTitle>My Transformations</GalleryTitle>
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
          },
          content: {
            background: 'transparent',
            border: 'none',
            padding: 0,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalImage src={currentImage} alt="Enlarged Image" />
      </Modal>
    </GallerySection>
  );
};

export default GalleryPhotos;
