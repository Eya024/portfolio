import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";



const Logo = styled.div`
  position: absolute;
  top: 3vh;
  left: 3vh;

  img {
    width: 100px;
    height: auto;
    cursor: pointer;

    @media (max-width: 768px) {
      width: 80px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    top: 2vh; /* Adjust position on medium screens */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: url("background-image-url.jpg") no-repeat center center/cover;
  color: white;
  margin: 0;
  padding: 20px;
  overflow: auto;

  @media (max-width: 1024px) {
    padding-top: 140px; /* Ensure space for the logo and content */
  }

  @media (max-width: 768px) {
    padding-top: 120px;
  }
`;

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 20px;
  max-width: 480px;
  margin-top: 25px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 20px; /* Ensure separation between logo and form */
  }
`;


const Header = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 15px;
    margin-top: 25px;


  @media (max-width: 768px) {
    font-size: 1.5rem; /* Adjust font size for smaller screens */
    margin-top: 10px;  /* Add margin to separate from logo */
  }
`;

const SubHeader = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #ccc;

  span {
    color: #ffc107;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller font for mobile screens */
    span {
      font-size: 1.4rem;
    }
  }
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
        //gender: { touched: false },

        location: { touched: false },
    });

    const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name); // Name must only contain alphabets and spaces
    const isValidPhone = (phone) => /^\+\d{1,15}$/.test(phone); // Phone must start with "+" followed by 1-15 digits
    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation



    const isValidAge = (age) => {
        const num = Number(age); // Convert input to a number
        return num >= 16 && num <= 65; // Check if age is between 16 and 65
    };

    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/"); // Redirect to the home route
    };



    const handleInputChange = (field, value) => {
        updateFormData(field, value); // Update the parent component's formData

        // Validate the input dynamically
        let isValid = true;
        if (field === "name") isValid = isValidName(value);
        if (field === "phone") isValid = isValidPhone(value);
        if (field === "email") isValid = isValidEmail(value);
        if (field === "age") isValid = isValidAge(value); // Validate age

        // Update formState to reflect validity
        setFormState((prev) => ({
            ...prev,
            [field]: { ...prev[field], touched: true, isValid },
        }));
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

        const requiredFields = ["name", "email", "age", "phone", "location", "gender"];
        const formIsValid =
            requiredFields.every((field) => formData[field] && formData[field].trim() !== "") &&
            isValidName(formData.name) &&
            isValidPhone(formData.phone) &&
            isValidEmail(formData.email)

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
            <Logo onClick={handleLogoClick}>
                <img src="/img/logo.png" alt="Logo" />
            </Logo>
            <Header>
                {t("step1.header")}
            </Header>
            <SubHeader><span>{t("step1.subheader")}</span></SubHeader>
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
                                formState.name.touched && (!formState.name.isValid || !formData.name.trim())
                                    ? "is-invalid"
                                    : "is-valid"
                            }
                        />
                        {formState.name.touched && !formState.name.isValid && (
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
                                formState.age.touched && (!formState.age.isValid || !formData.age.trim())
                                    ? "is-invalid"
                                    : formState.age.touched
                                        ? "is-valid"
                                        : ""
                            }
                        />
                        {formState.age.touched && !formState.age.isValid && (
                            <div className="invalid-feedback">
                                {t("step1.validationErrors.age")} {/* Example: "Age must be between 16 and 65" */}
                            </div>
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
                    {gender === "" && (
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
                                formState.email.touched && (!formState.email.isValid || !formData.email.trim())
                                    ? "is-invalid"
                                    : "is-valid"
                            }
                        />
                        {formState.email.touched && !formState.email.isValid && (
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
                                formState.phone.touched && (!formState.phone.isValid || !formData.phone.trim())
                                    ? "is-invalid"
                                    : "is-valid"
                            }
                        />
                        {formState.phone.touched && !formState.phone.isValid && (
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