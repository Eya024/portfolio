import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
  color: white;
`;

const GridItem = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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
    font-size: 2rem;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  button {
    background: #af1e1e;
    border: none;
    color: #000;
    padding: 15px 30px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #9c4f55;
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
          <button onClick={handleButtonClick} >{t("gridSection.section.button")}</button>
        </Section>
      </>
    );
  };
  
  export default GridSection;