import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Logo = styled.div`
  text-align: center;
  margin-bottom: 10px;

  img {
    width: 80px;
    height: auto;
    cursor: pointer;

    @media (min-width: 769px) {
      width: 100px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Header = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubHeader = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #ccc;

  span {
    color: #d3d3d3;
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    span {
      font-size: 1.4rem;
    }
  }
`;

const ObjectiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns */
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column for mobile */
  }
`;

const ObjectiveCard = styled.div`
  background: ${(props) => (props.selected ? "#af1e1e" : "#222")};
  color: ${(props) => (props.selected ? "white" : "white")};
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.selected ? "0 4px 15px rgba(255, 73, 7, 0.6)" : "0 4px 10px rgba(0, 0, 0, 0.5)"};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.selected ? "#9c4f55" : "#333")};
    color: white;
  }

  /* Center the last card if it's alone */
  &:last-child:nth-child(odd) {
    grid-column: 1 / -1; /* Span across both columns */
    justify-self: center; /* Center the card horizontally */
    max-width: 50%; /* Limit the width to half of the grid */
  }

  @media (max-width: 768px) {
    &:last-child:nth-child(odd) {
      grid-column: auto; /* Reset for mobile */
      max-width: 100%; /* Full width on mobile */
      justify-self: stretch; /* Stretch to full width */
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0 5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin: 0 10px 10px;
  color: ${(props) => (props.selected ? "white" : "#bbb")};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#af1e1e" : "#444")};
  color: ${(props) => (props.primary ? "white" : "white")};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 120px;

  &:hover {
    background: ${(props) => (props.primary ? "#9c4f55" : "#555")};
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const Step3 = ({ formData, updateFormData, onNext, onBack }) => {
  const { t } = useTranslation();
  const [selectedObjective, setSelectedObjective] = useState(formData.objective);
  const [error, setError] = useState("");

  const objectives = [
    {
      title: t("step3.objectives.0.title"),
      description: t("step3.objectives.0.description"),
      img: "/img/resources/renforcementmusculaire.jpeg",
    },
    {
      title: t("step3.objectives.1.title"),
      description: t("step3.objectives.1.description"),
      img: "/img/resources/lifestyle.jpg",
    },
    {
      title: t("step3.objectives.2.title"),
      description: t("step3.objectives.2.description"),
      img: "/img/resources/pertedepoids.jpeg",
    },
    {
      title: t("step3.objectives.3.title"),
      description: t("step3.objectives.3.description"),
      img: "/img/resources/muscle.jpg",
    },
    {
      title: t("step3.objectives.4.title"),
      description: t("step3.objectives.4.description"),
      img: "/img/resources/prisedemasse.jpeg",
    },
  ];

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  // Sync selectedObjective with formData.objective
  useEffect(() => {
    setSelectedObjective(formData.objective);
  }, [formData.objective]);

  // Handle selection of a goal
  const handleSelect = (index) => {
    setSelectedObjective(index);
    updateFormData("objective", index); // Update formData.objective immediately
    setError(""); // Clear any existing error when a selection is made
  };

  // Handle clicking the "Next" button
  const handleNext = () => {
    if (selectedObjective !== null) {
      onNext(selectedObjective); // Pass the selected objective index to the next step
    } else {
      setError(t("step3.error")); // Set error if no objective is selected
    }
  };

  return (
    <Container>
      <Logo onClick={handleLogoClick}>
        <img src="/img/logo.png" alt="Logo" />
      </Logo>
      <Header>{t("step3.header")}</Header>
      <SubHeader>
        <span>{t("step3.subheader")}</span>
      </SubHeader>
      <FormContainer>
        <ObjectiveGrid>
          {objectives.map((objective, index) => (
            <ObjectiveCard
              key={index}
              selected={selectedObjective === index}
              onClick={() => handleSelect(index)}
            >
              <Image src={objective.img} alt={objective.title} />
              <Title>{objective.title}</Title>
              <Description selected={selectedObjective === index}>
                {objective.description}
              </Description>
            </ObjectiveCard>
          ))}
        </ObjectiveGrid>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonGroup>
          <Button onClick={onBack}>{t("step3.back")}</Button>
          <Button primary onClick={handleNext}>
            {t("step3.next")}
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default Step3;