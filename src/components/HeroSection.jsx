import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const HeroSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4vh 8vh;
  height: 100vh;
  color: white;
`;

const Content = styled.div`
  max-width: 50%;
`;

const Title = styled.h1`
  font-size: 6vh;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 2vh;
  color: white;

  span {
    color: #af1e1e;
  }
`;

const Subtitle = styled.p`
  font-size: 2.2vh;
  color: #d3d3d3;
  margin-bottom: 3vh;
`;

const StartButton = styled.button`
  padding: 1.5vh 3vh;
  font-size: 2vh;
  color: black;
  background: #af1e1e;
  border: none;
  border-radius: 0.5vh;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1vh;
  transition: background 0.3s ease;

  &:hover {
    background: #9c4f55;
  }

  i {
    font-size: 1.8vh;
  }
`;

const ImageContainer = styled.div`
  width: 500px; /* Fixed width */
  height: 400px; /* Fixed height */
  background-color: black; /* Black background */
  border-radius: 1vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  img {
    max-width: 100%; /* Maintain width constraints */
    max-height: 100%; /* Maintain height constraints */
    object-fit: contain; /* Ensures the entire image fits in the container */
  }
`;

const HeroSection = () => {
  const navigate = useNavigate(); // React Router's hook to navigate
  const { t, i18n } = useTranslation(); // Initialize the useTranslation hook

  const handleButtonClick = () => {
    // Get the current language from i18n and use it to navigate
    const currentLanguage = i18n.language || "fr"; // Default to 'fr' if no language is set
    navigate(`/inscription/${currentLanguage}`); // Navigate to the correct path
  };

  return (
    <HeroSectionContainer>
      <Content>
        {/* Use translation keys for title and subtitle */}
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
