import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

// Keyframes for arrow animation
const float = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px); // Move the arrow to the right
  }
  100% {
    transform: translateX(0);
  }
`;

const HeroSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4vh 5vw; /* Match GallerySection padding: 4vh 5vw */
  height: 100vh;
  color: white;
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 4vh 2vw; /* Further reduce horizontal padding for phone screens */
  }
`;

const ImageContainer = styled.div`
  width: 43%;
  max-width: 500px;
  aspect-ratio: 5 / 4;
  background-color: black;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.5);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Show the whole image without cropping */
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &.active {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 2vh;
  }
`;

const Content = styled.div`
  max-width: 50%;
  flex: 1;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    max-width: 90%;
    padding: 0; /* Remove padding for phone screens */
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 2vh;
  color: white;

  span {
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: #d3d3d3;
  margin-bottom: 3vh;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  color: white;
  background: #af1e1e;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #9c4f55;
  }

  i {
    font-size: 1.4rem;
    animation: ${float} 1.5s ease-in-out infinite; // Apply the float animation
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem 1.6rem;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // State to track the active image index
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of image paths
  const images = [
    "/img/resources/coach1.jpeg",
    "/img/resources/coach2.jpeg",
    "/img/resources/coach3.jpeg",
  ];

  // Function to handle image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  const handleButtonClick = () => {
    const currentLanguage = i18n.language || "fr";
    navigate(`/inscription/${currentLanguage}`);
  };

  return (
    <HeroSectionContainer>
      <Content>
        <Title dangerouslySetInnerHTML={{ __html: t("heroSection.title") }} />
        <Subtitle>{t("heroSection.subtitle")}</Subtitle>
        <StartButton onClick={handleButtonClick}>
          {t("heroSection.startButton")} <i className="fas fa-arrow-right"></i>
        </StartButton>
      </Content>
      <ImageContainer>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={t("heroSection.title")}
            className={index === activeIndex ? "active" : ""}
          />
        ))}
      </ImageContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;