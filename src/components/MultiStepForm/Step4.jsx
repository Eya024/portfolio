import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("background-image-url.jpg") no-repeat center center/cover;
  color: white;
  padding: 20px;
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
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 10px;

  span {
    color: #ffc107;
  }
`;

const SubHeader = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #bbb;
`;

const AvailabilityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
`;

const AvailabilityCard = styled.div`
  background: ${(props) => (props.selected ? "#ffc107" : "#222")};
  color: ${(props) => (props.selected ? "#000" : "white")};
  border-radius: 12px;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.selected ? "0 4px 15px rgba(255, 193, 7, 0.6)" : "0 4px 10px rgba(0, 0, 0, 0.5)"};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.selected ? "#e0a800" : "#333")};
  }
`;

const TimeSlot = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
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
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#ffc107" : "#444")};
  color: ${(props) => (props.primary ? "#000" : "white")};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 120px;

  &:hover {
    background: ${(props) => (props.primary ? "#e0a800" : "#555")};
  }
`;

const Step4 = ({ onFinish, onBack }) => {
    const { t } = useTranslation();
    const [selectedAvailability, setSelectedAvailability] = useState(null);
    const [error, setError] = useState("");
  
    const availabilities = t("step4.availabilities", { returnObjects: true });
  
    const handleSelect = (index) => {
      setSelectedAvailability(index);
      setError(""); // Clear error on selection
    };
  
    const handleFinish = () => {
      if (selectedAvailability !== null) {
        onFinish(selectedAvailability); // Pass the selected availability index
      } else {
        setError(t("step4.error"));
      }
    };
  
    return (
      <Container>
        <Header>
            {t("step4.header")} <span>{t("step4.subheader")}</span>
          </Header>
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