import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  background: url("background-image-url.jpg") no-repeat center center/cover; /* Replace with your image URL */
  color: white;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.8); /* Slightly darker for better contrast */
  border-radius: 16px; /* More rounded corners */
  padding: 40px; /* Larger padding for more spacing */
  padding: 40px 40px; /* Equal padding left and right */
  max-width: 540px; /* Wider form */
  width: 100%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  box-sizing: border-box; /* Includes padding in width calculation */
`;



const Header = styled.h2`
  font-size: 2.4rem; /* Bigger font size for the header */
  text-align: center;
  margin-bottom: 20px;

  span {
    color: #ffc107;
    font-size: 2rem; /* Match the main header size */
  }
`;

const SubHeader = styled.p`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.5rem; /* Larger font size for subheader */
  color: #ccc; /* Slightly lighter color for readability */
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  span {
    font-size: 1.2rem; /* Larger label text */
    font-weight: bold;
    margin-left: 10px;
  }
`;

const Input = styled.input`
  width: calc(100% - 30px); /* Makes sure the input stays aligned */
  padding: 15px; /* Larger input field padding */
  margin-bottom: 25px;
  border: 1px solid #444;
  border-radius: 10px;
  background: #333; /* Slightly lighter background for inputs */
  color: white;
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border: 1px solid #ffc107;
  }
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Add space between buttons */
  margin-bottom: 25px;
`;

const GenderButton = styled.button`
  flex: 1;
  padding: 15px; /* Larger button size */
  border: 1px solid ${(props) => (props.active ? "#ffc107" : "#555")};
  background: ${(props) => (props.active ? "#ffc107" : "#333")};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  border-radius: 10px;
  font-size: 1.2rem; /* Larger font size */
  cursor: pointer;
  box-sizing: border-box; /* Ensures padding is included */
  transition: background 0.3s ease;

  &:hover {
    background: #ffc107;
    color: #000;
  }
`;

const Button = styled.button`
  background: #ffc107;
  color: #000;
  padding: 15px 25px; /* Larger padding for a bigger button */
  border: none;
  border-radius: 10px;
  font-size: 1.5rem; /* Larger font size */
  font-weight: bold;
  cursor: pointer;
  width: 100%; /* Make it align with input fields */
  margin-top: 15px; /* Add space above the button */
  box-sizing: border-box; /* Ensures padding is included */
  transition: background 0.3s ease;

  &:hover {
    background: #e0a800;
  }
`;



const Step1 = () => {
  const [gender, setGender] = useState("");

  return (
    <Container>
      <Header>
        Intake Form <span>Please fill out the form</span>
      </Header>
      <SubHeader>Provide your personal information to proceed.</SubHeader>
      <FormContainer>
        <form>
          <Label>
            <span>Personal Information</span>
          </Label>
          <Input type="text" placeholder="Name" />
          <Input type="number" placeholder="Age" />

          <GenderContainer>
            <GenderButton
              type="button"
              active={gender === "Male"}
              onClick={() => setGender("Male")}
            >
              Male
            </GenderButton>
            <GenderButton
              type="button"
              active={gender === "Female"}
              onClick={() => setGender("Female")}
            >
              Female
            </GenderButton>
          </GenderContainer>

          <Input type="email" placeholder="Email" />
          <Input type="tel" placeholder="Phone" />
          <Input type="text" placeholder="Location" />

          <Button type="submit">Next</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Step1;
