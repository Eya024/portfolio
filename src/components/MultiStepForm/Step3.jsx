import React, { useState } from "react";
import styled from "styled-components";

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

const ObjectiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const ObjectiveCard = styled.div`
  background: ${(props) => (props.selected ? "#ffc107" : "#222")};
  color: ${(props) => (props.selected ? "#000" : "white")};
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.selected ? "0 4px 15px rgba(255, 193, 7, 0.6)" : "0 4px 10px rgba(0, 0, 0, 0.5)"};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.selected ? "#e0a800" : "#333")};
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
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin: 0 10px 10px;
  color: ${(props) => (props.selected ? "#222" : "#bbb")};
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

const Step3 = ({ onNext, onBack }) => {
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [error, setError] = useState("");

  const objectives = [
    {
      title: "Get Stronger",
      description: "Improve your strength and endurance.",
      img: "path-to-image-1.jpg",
    },
    {
      title: "Healthy Lifestyle",
      description: "Adopt a healthier lifestyle.",
      img: "path-to-image-2.jpg",
    },
    {
      title: "Weight Loss",
      description: "Achieve your weight loss goals.",
      img: "path-to-image-3.jpg",
    },
    {
      title: "Competition",
      description: "Prepare for competition.",
      img: "path-to-image-4.jpg",
    },
  ];

  const handleSelect = (index) => {
    setSelectedObjective(index);
    setError(""); // Clear any existing error when a selection is made
  };

  const handleNext = () => {
    if (selectedObjective !== null) {
      onNext(selectedObjective); // Pass the selected objective index to the next step
    } else {
      setError("Please select an objective before proceeding.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Header>
          Intake Form <span>Please fill out the form</span>
        </Header>
        <SubHeader>Provide your personal information to proceed.</SubHeader>
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
          <Button onClick={onBack}>Retour</Button>
          <Button primary onClick={handleNext}>
            Next
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default Step3;
