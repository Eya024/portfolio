import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const HeroSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4vh 8vw; /* Use vh for vertical and vw for horizontal padding */
  height: 100vh;
  color: white;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  flex-direction: row; /* Default to row layout */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack content and image vertically on smaller screens */
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
    height: auto; /* Allow for content to flow naturally */
  }
`;

const ImageContainer = styled.div`
  width: 40%; /* Use percentage for responsiveness */
  max-width: 500px; /* Limit maximum width */
  aspect-ratio: 5 / 4; /* Maintain aspect ratio */
  background-color: black; /* Black background */
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.5);

  img {
    width: 100%; /* Maintain width constraints */
    height: 100%; /* Maintain height constraints */
    object-fit: cover; /* Ensures the entire image fits in the container */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width for smaller screens */
    margin-top: 2vh; /* Add spacing between content and image */
  }
`;

const Content = styled.div`
  max-width: 50%;
  flex: 1;
  padding: 2vw; /* Add padding to avoid overlapping on smaller screens */
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: center; /* Vertically center the content */
  align-items: flex-start; /* Align content to the left by default (for larger screens) */
  text-align: left; /* Left-align the text on larger screens */

  @media (max-width: 768px) {
    align-items: center; /* Center content horizontally on smaller screens */
    text-align: center; /* Center text on smaller screens */
    max-width: 90%; /* Adjust max-width for smaller screens */
  }
`;

const Title = styled.h1`
  font-size: 4rem; /* Use rem for consistent font sizing */
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 2vh;
  color: white;

  span {
    color: #af1e1e;
  }

  @media (max-width: 768px) {
    font-size: 3rem; /* Adjust font size for smaller screens */
  }
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: #d3d3d3;
  margin-bottom: 3vh;

  @media (max-width: 768px) {
    font-size: 1.4rem; /* Adjust font size for smaller screens */
  }
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  color: black;
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
  }

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Adjust font size for smaller screens */
    padding: 0.8rem 1.6rem;
  }
`;



const HeroSection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
        <img src="/img/resources/coach1.jpeg" alt={t("heroSection.title")} />
      </ImageContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;
