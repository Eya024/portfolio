import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

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
  max-width: 40%;
  border-radius: 1vh;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate(); // React Router's hook to navigate
  const { t } = useTranslation(); // Initialize the useTranslation hook

  const handleButtonClick = () => {
    navigate("/inscription"); // Navigate to /inscription
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
        <img src="/img/hero/hero-1.jpg" alt={t("heroSection.title")} />
      </ImageContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;
