import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("background-image-url.jpg") no-repeat center center/cover; /* Replace with your image URL */
  color: white;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
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
  margin-bottom: 30px;
  font-size: 1rem;
  color: #bbb;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  span {
    font-size: 1rem;
    font-weight: bold;
    margin-left: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  background: #222;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid #ffc107;
  }
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

const Step2 = ({ formData = {}, updateFormData, nextStep, prevStep }) => {
    const { height = "", weight = "" } = formData; // Default to empty strings if properties are missing
  
    return (
      <Container>
        <FormContainer>
          <Header>
            Intake Form <span>Please fill out the form</span>
          </Header>
          <SubHeader>Provide your personal information to proceed.</SubHeader>
          <form>
            <Label>
              <span>Measurements</span>
            </Label>
            <Input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => updateFormData("height", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => updateFormData("weight", e.target.value)}
            />
            <ButtonGroup>
              <Button type="button" onClick={prevStep}>
                Retour
              </Button>
              <Button type="button" primary onClick={nextStep}>
                Next
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </Container>
    );
  };
  
  export default Step2;
  