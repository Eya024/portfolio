import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


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
  padding: 10px;
  margin: 0 6px;
  border: 1px solid ${(props) => (props.active === "true" ? "#ffc107" : "#555")}; /* Fix here */
  background: ${(props) => (props.active === "true" ? "#ffc107" : "#333")}; /* Fix here */
  color: ${(props) => (props.active === "true" ? "#000" : "#fff")}; /* Fix here */
  border-radius: 8px;
  font-size: 1rem;
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
    const { t } = useTranslation();
    const [gender, setGender] = useState(formData.gender || ""); // Initialize gender with formData.gender

    const [formState, setFormState] = useState({
        name: { touched: false },
        age: { touched: false },
        email: { touched: false },
        phone: { touched: false },
        location: { touched: false },
    });

    const handleInputChange = (field, value) => {
        updateFormData(field, value); // Directly update formData in the parent
    };

    const handleBlur = (field) => {
        setFormState((prev) => ({
            ...prev,
            [field]: { ...prev[field], touched: true },
        }));
    };

    const handleGenderClick = (selectedGender) => {
        setGender(selectedGender); // Update local gender state
        updateFormData("gender", selectedGender); // Update formData in the parent component
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate only the fields relevant for Step 1
        const requiredFields = ["name", "email", "age", "phone", "location", "gender"];
        const formIsValid = requiredFields.every(
            (field) => formData[field] && formData[field].trim() !== ""
        );

        if (formIsValid) {
            nextStep(); // Proceed to the next step
        } else {
            // Show validation errors
            setFormState((prev) => {
                const updatedState = {};
                for (let key of requiredFields) {
                    updatedState[key] = { touched: true };
                }
                return updatedState;
            });
        }
    };
    
    
    

    return (
        <Container>
            <Header>
                {t("step1.header")} <span>{t("step1.subheader")}</span>
            </Header>
            <SubHeader>Provide your personal information to proceed.</SubHeader>
            <FormContainer>
                <form noValidate onSubmit={handleSubmit}>
                    <Label>
                        <span>{t("step1.personalInfo")}</span>
                    </Label>
                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder={t("step1.placeholders.name")}
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            onBlur={() => handleBlur("name")}
                            required
                            className={
                                formState.name.touched && !formData.name.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.name.touched && !formData.name.trim() && (
                            <div className="invalid-feedback">{t("step1.validationErrors.name")}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Input
                            type="number"
                            placeholder={t("step1.placeholders.age")}
                            value={formData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            onBlur={() => handleBlur("age")}
                            required
                            className={
                                formState.age.touched && !formData.age.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.age.touched && !formData.age.trim() && (
                            <div className="invalid-feedback">{t("step1.validationErrors.age")}</div>
                        )}
                    </div>
                    <GenderContainer>
                        <GenderButton
                            type="button"
                            active={gender === t("step1.gender.male") ? "true" : "false"}
                            onClick={() => handleGenderClick(t("step1.gender.male"))}
                        >
                            {t("step1.gender.male")}
                        </GenderButton>
                        <GenderButton
                            type="button"
                            active={gender === t("step1.gender.female") ? "true" : "false"}
                            onClick={() => handleGenderClick(t("step1.gender.female"))}
                        >
                            {t("step1.gender.female")}
                        </GenderButton>
                    </GenderContainer>
                    { gender === "" && (
                        <div className="invalid-feedback" style={{ color: "#dc3545", marginBottom: "10px" }}>
                            {t("step1.gender.error")}
                        </div>
                    )}
                    <div className="mb-3">
                        <Input
                            type="email"
                            placeholder={t("step1.placeholders.email")}
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            required
                            className={
                                formState.email.touched && !formData.email.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.email.touched && !formData.email.trim() && (
                            <div className="invalid-feedback">{t("step1.validationErrors.email")}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Input
                            type="tel"
                            placeholder={t("step1.placeholders.phone")}
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            required
                            className={
                                formState.phone.touched && !formData.phone.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.phone.touched && !formData.phone.trim() && (
                            <div className="invalid-feedback">{t("step1.validationErrors.phone")}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder={t("step1.placeholders.location")}
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            onBlur={() => handleBlur("location")}
                            required
                            className={
                                formState.location.touched && !formData.location.trim()
                                    ? "is-invalid"
                                    : ""
                            }
                        />
                        {formState.location.touched && !formData.location.trim() && (
                            <div className="invalid-feedback">{t("step1.validationErrors.location")}</div>
                        )}
                    </div>
                    <Button type="submit">{t("step1.next")}</Button>
                </form>
            </FormContainer>
        </Container>
    );
};
export default Step1;