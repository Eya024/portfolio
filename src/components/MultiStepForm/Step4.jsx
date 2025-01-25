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
  overflow: hidden;
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

const AvailabilityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const AvailabilityCard = styled.div`
  background: ${(props) => (props.selected ? "#af1e1e" : "#222")};
  color: ${(props) => (props.selected ? "white" : "white")};
  border-radius: 12px;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.selected ? "0 4px 15px rgba(255, 73, 7, 0.6)" : "0 4px 10px rgba(0, 0, 0, 0.5)"};
  transition: all 0.3s ease;
  flex: 1 1 45%;
  max-width: 45%;

  &:hover {
    background: ${(props) => (props.selected ? "#9c4f55" : "#333")};
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 10px;
  }
`;

const TimeSlot = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
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

const Step4 = ({ formData, updateFormData, onFinish, onBack }) => {
  const { t } = useTranslation();
  const [selectedAvailability, setSelectedAvailability] = useState(formData.availability);
  const [error, setError] = useState("");

  const availabilities = t("step4.availabilities", { returnObjects: true });

  const navigate = useNavigate();

  // Sync selectedAvailability with formData.availability
  useEffect(() => {
    setSelectedAvailability(formData.availability);
  }, [formData.availability]);

  // Handle selection of a timeslot
  const handleSelect = (index) => {
    setSelectedAvailability(index);
    updateFormData("availability", index); // Update formData.availability immediately
    setError(""); // Clear error on selection
  };

  // Handle clicking the "Finish" button
  const handleFinish = () => {
    if (selectedAvailability !== null) {
      onFinish(selectedAvailability); // Pass the selected availability index
    } else {
      setError(t("step4.error"));
    }
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Logo onClick={handleLogoClick}>
        <img src="/img/logo.png" alt="Logo" />
      </Logo>
      <Header>{t("step4.header")}</Header>
      <SubHeader>
        <span>{t("step4.subheader")}</span>
      </SubHeader>
      <FormContainer>
        <AvailabilityContainer>
          {availabilities.map((time, index) => (
            <AvailabilityCard
              key={index}
              selected={selectedAvailability === index}
              onClick={() => handleSelect(index)}
            >
              <TimeSlot>{time}</TimeSlot>
            </AvailabilityCard>
          ))}
        </AvailabilityContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonGroup>
          <Button onClick={onBack}>{t("step4.back")}</Button>
          <Button primary onClick={handleFinish}>
            {t("step4.finish")}
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default Step4;