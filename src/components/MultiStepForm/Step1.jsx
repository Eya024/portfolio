import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Change alignment to allow natural stacking */
  min-height: 100vh; 
  background: url("background-image-url.jpg") no-repeat center center/cover;
  color: white;
  margin: 0;
  padding: 20px; /* Add some padding to prevent content from hitting the edges */
  overflow: auto; /* Enable scrolling for the entire page */
`;


const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 20px;
  max-width: 480px; 
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  overflow: hidden; /* Prevent overflow of internal content */
  display: flex; /* Use flexbox for internal layout */
  flex-direction: column; /* Stack children vertically */
`;


const Header = styled.h2`
  font-size: 2rem; /* Smaller font size */
  text-align: center;
  margin-bottom: 15px;

  span {
    color: #ffc107;
    font-size: 1.8rem; /* Match the main header size */
  }
`;

const SubHeader = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem; /* Smaller font size */
  color: #ccc;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    font-size: 1rem; /* Reduced font size */
    font-weight: bold;
    margin-left: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  background: #333; /* Dark background */
  color: white; /* White text */
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid #ffc107;
  }

  /* Hide validation styles until input is touched */
  &:not(:focus):not(:valid) {
    background: #333; /* Keep dark background */
    border-color: #444; /* Neutral border */
  }

  /* Override Bootstrap validation styles */
  &.is-invalid {
    background: #333; /* Keep dark background */
    border-color: #dc3545; /* Bootstrap's danger color */
  }

  &.is-valid {
    background: #333; /* Keep dark background */
    border-color: #28a745; /* Bootstrap's success color */
  }
`;



const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const GenderButton = styled.button`
  flex: 1;
  padding: 10px; /* Reduced button size */
  margin: 0 6px;
  border: 1px solid ${(props) => (props.active ? "#ffc107" : "#555")};
  background: ${(props) => (props.active ? "#ffc107" : "#333")};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  border-radius: 8px; /* Smaller border radius */
  font-size: 1rem; /* Reduced font size */
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ffc107;
    color: #000;
  }
`;

const Button = styled.button`
  background: #ffc107;
  color: #000;
  padding: 10px 20px; /* Smaller padding */
  border: none;
  border-radius: 8px; /* Smaller border radius */
  font-size: 1.2rem; /* Reduced font size */
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #e0a800;
  }
`;

const Step1 = ({ formData, updateFormData, nextStep }) => {
    const [gender, setGender] = useState("");
    const [genderTouched, setGenderTouched] = useState(false); // Track if gender is touched
    const [formState, setFormState] = useState({
        name: { value: "", touched: false },
        age: { value: "", touched: false },
        email: { value: "", touched: false },
        phone: { value: "", touched: false },
        location: { value: "", touched: false },
    });

    const handleInputChange = (field, value) => {
        setFormState((prev) => ({
            ...prev,
            [field]: { ...prev[field], value },
        }));
    };

    const handleBlur = (field) => {
        setFormState((prev) => ({
            ...prev,
            [field]: { ...prev[field], touched: true },
        }));
    };

    const handleGenderClick = (selectedGender) => {
        setGender(selectedGender);
        setGenderTouched(true); // Mark gender as touched
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Mark gender as touched
        setGenderTouched(true);
    
        // Check if the entire form, including gender, is valid
        const formIsValid =
            Object.values(formState).every((field) => field.value.trim() !== "") &&
            gender !== "";
    
        if (formIsValid) {
            // Update the parent formData state
            updateFormData("name", formState.name.value);
            updateFormData("age", formState.age.value);
            updateFormData("email", formState.email.value);
            updateFormData("phone", formState.phone.value);
            updateFormData("location", formState.location.value);
            updateFormData("gender", gender);
    
            // Move to the next step
            nextStep();
        } else {
            // Mark all fields as touched to show validation errors
            setFormState((prev) => {
                const updatedState = {};
                for (let key in prev) {
                    updatedState[key] = { ...prev[key], touched: true };
                }
                return updatedState;
            });
        }
    };
    return (
        <Container>
            <Header>
                Intake Form <span>Please fill out the form</span>
            </Header>
            <SubHeader>Provide your personal information to proceed.</SubHeader>
            <FormContainer>
                <form noValidate onSubmit={handleSubmit}>
                    <Label>
                        <span>Personal Information</span>
                    </Label>
                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder="Name"
                            value={formState.name.value}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            onBlur={() => handleBlur("name")}
                            required
                            className={
                                formState.name.touched && !formState.name.value.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.name.touched && !formState.name.value.trim() && (
                            <div className="invalid-feedback">Please enter your name.</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Input
                            type="number"
                            placeholder="Age"
                            value={formState.age.value}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            onBlur={() => handleBlur("age")}
                            required
                            className={
                                formState.age.touched && !formState.age.value.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.age.touched && !formState.age.value.trim() && (
                            <div className="invalid-feedback">Please enter your age.</div>
                        )}
                    </div>
                    <GenderContainer>
                        <GenderButton
                            type="button"
                            active={gender === "Male"}
                            onClick={() => handleGenderClick("Male")}
                        >
                            Male
                        </GenderButton>
                        <GenderButton
                            type="button"
                            active={gender === "Female"}
                            onClick={() => handleGenderClick("Female")}
                        >
                            Female
                        </GenderButton>
                    </GenderContainer>
                    {genderTouched && gender === "" && (
                        <div className="invalid-feedback" style={{ color: "#dc3545", marginBottom: "10px" }}>
                            Please select your gender.
                        </div>
                    )}
                    <div className="mb-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={formState.email.value}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            required
                            className={
                                formState.email.touched && !formState.email.value.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.email.touched && !formState.email.value.trim() && (
                            <div className="invalid-feedback">
                                Please enter a valid email address.
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Input
                            type="tel"
                            placeholder="Phone"
                            value={formState.phone.value}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            required
                            className={
                                formState.phone.touched && !formState.phone.value.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.phone.touched && !formState.phone.value.trim() && (
                            <div className="invalid-feedback">
                                Please enter a valid phone number.
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder="Location"
                            value={formState.location.value}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            onBlur={() => handleBlur("location")}
                            required
                            className={
                                formState.location.touched && !formState.location.value.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.location.touched && !formState.location.value.trim() && (
                            <div className="invalid-feedback">Please enter your location.</div>
                        )}
                    </div>
                    <Button type="submit">Next</Button>
                </form>
            </FormContainer>
        </Container>
    );
    
};

export default Step1;