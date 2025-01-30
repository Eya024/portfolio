import React, { useState, useEffect } from "react";
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

const AboutMeContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4vh 5vw; /* Match GallerySection padding: 4vh 5vw */
  height: 100vh;
  color: white;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10vh;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 4vh 2vw; /* Further reduce horizontal padding for phone screens */
  }
`;

const ImageContainer = styled.div`
  width: 30%; /* Smaller width for larger screens */
  max-width: 400px; /* Smaller max-width for larger screens */
  aspect-ratio: 9 / 16; /* Maintain the 16:9 aspect ratio (height is taller than width) */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.5);
  position: relative;

  /* Applying the backdrop blur effect */
  backdrop-filter: blur(10px); /* Blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari compatibility */

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
    width: 100%; /* Set width to 100% */
    max-width: none; /* Remove max-width constraint for mobile */
    margin-top: 35vh;
    margin-bottom: 25vh;

    aspect-ratio: 16 / 9; /* Switch to a wider aspect ratio for mobile */
    transform: scale(2.75); /* Scale the container up by 20% */
    transform-origin: center; /* Ensure the scaling is centered */
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
  font-size: 1.4rem;
  color: #d3d3d3;
  margin-bottom: 3vh;

  @media (max-width: 768px) {
    font-size: 1.2rem;
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

const AboutMe = () => {
  const { t } = useTranslation();

  // State to track the active image index
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of image paths
  const images = [
    "/img/resources/coach111.jpeg",
    "/img/resources/coach2.jpeg",
    "/img/resources/coach3.jpeg",
    "/img/resources/coach1.jpeg"
  ];

  // Function to handle image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <AboutMeContainer>
      <Content>
        <Title dangerouslySetInnerHTML={{ __html: t("aboutMe.title") }} />
        <Subtitle
          dangerouslySetInnerHTML={{ __html: t("aboutMe.subtitle") }}
        />
   
      </Content>
      <ImageContainer>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={t("aboutMe.title")}
            className={index === activeIndex ? "active" : ""}
          />
        ))}
      </ImageContainer>
    </AboutMeContainer>
  );
};

export default AboutMe;