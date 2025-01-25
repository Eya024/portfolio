import React from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Keyframes for floating animation
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const float1 = keyframes`
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns for larger screens */
  gap: 20px;
  padding: 40px;
  color: white;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }
`;

const GridItem = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${float} 3s ease-in-out infinite; // Apply the floating animation

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    color: #bbb;
  }
`;

const Section = styled.section`
  text-align: center;
  padding: 60px 20px;
  color: white;

  h2 {
    font-size: 4rem; /* Match font size in HeroSection */
    font-weight: bold; /* Match font weight in HeroSection */
    line-height: 1.2; /* Match line height in HeroSection */
    margin-bottom: 2vh; /* Match margin-bottom in HeroSection */
    color: white; /* Match color in HeroSection */

    @media (max-width: 768px) {
      font-size: 3rem; /* Match responsive font size in HeroSection */
    }
  }

  p {
    font-size: 1.6rem; /* Match font size in HeroSection */
    color: #d3d3d3; /* Match color in HeroSection */
    margin-bottom: 3vh; /* Match margin-bottom in HeroSection */

    @media (max-width: 768px) {
      font-size: 1.4rem; /* Match responsive font size in HeroSection */
    }
  }

  .button-container {
    display: flex;
    justify-content: center; /* Center the button horizontally */
  }

  button {
    background: #af1e1e;
    border: none;
    color: white;
    padding: 15px 30px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: #9c4f55;
    }

    i {
      font-size: 1.2rem;
      animation: ${float1} 1.5s ease-in-out infinite; // Apply the float animation
    }
  }
`;

const GridSection = () => {
  const { t, i18n } = useTranslation(); // Initialize the useTranslation hook
  const navigate = useNavigate(); // React Router's hook to navigate

  const handleButtonClick = () => {
    // Get the current language from i18n and use it to navigate
    const currentLanguage = i18n.language || "fr"; // Default to 'fr' if no language is set
    navigate(`/inscription/${currentLanguage}`); // Navigate to the correct path
  };

  const gridItems = t("gridSection.gridItems", { returnObjects: true });

  return (
    <>
      <GridContainer>
        {gridItems.map((item, index) => (
          <GridItem key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </GridItem>
        ))}
      </GridContainer>
      <Section>
        <h2>{t("gridSection.section.heading")}</h2>
        <p>{t("gridSection.section.description")}</p>
        <div className="button-container">
          <button onClick={handleButtonClick}>
            {t("gridSection.section.button")} <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </Section>
    </>
  );
};

export default GridSection;