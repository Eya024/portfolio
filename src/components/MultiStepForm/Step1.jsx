import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Logo = styled.div`
  text-align: center; /* Center the logo */
  margin-bottom: 10px; /* Add space between logo and header */

  img {
    width: 80px; /* Smaller logo for mobile */
    height: auto;
    cursor: pointer;

    @media (min-width: 769px) {
      width: 100px; /* Larger logo for desktop */
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  color: white;
  margin: 0;
  padding: 20px;
  overflow: auto;

  @media (max-width: 768px) {
    padding: 10px; /* Reduce padding for smaller screens */
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

  @media (max-width: 768px) {
    padding: 15px; /* Reduce padding for smaller screens */
    margin-top: 15px; /* Adjust margin for smaller screens */
  }
`;

const Header = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 0; /* Remove top margin to place it directly under the logo */

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Smaller font size for mobile */
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

  @media (max-width: 768px) {
    span {
      font-size: 0.9rem; /* Smaller font for mobile screens */
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #444; /* Default border color */
  border-radius: 8px;
  background: #333; /* Dark background */
  color: white; /* White text */
  font-size: 1rem;

  /* Yellow border only when focused */
  &:focus {
    outline: none;
    border-color: #ffc107; /* Yellow border */
  }

  /* Red border for invalid inputs (persists even when not focused) */
  &.is-invalid {
    border-color: #dc3545; /* Red border */
  }

  /* Green border for valid inputs (only during focus) */
  &:focus.is-valid {
    border-color: #ffc107; /* Green border */
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Smaller font for mobile screens */
    padding: 8px; /* Reduce padding for smaller screens */
  }
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack gender buttons vertically on smaller screens */
    gap: 10px; /* Add space between buttons */
  }
`;

const GenderButton = styled.button`
  flex: 1;
  padding: 10px;
  margin: 0 6px;
  border: 0px solid ${(props) => (props.active === "true" ? "#af1e1e" : "#555")};
  background: ${(props) => (props.active === "true" ? "#af1e1e" : "#333")};
  color: ${(props) => (props.active === "true" ? "#fff" : "#fff")};
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #9c4f55;
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0; /* Remove horizontal margin on smaller screens */
    font-size: 0.9rem; /* Smaller font for mobile screens */
    padding: 8px; /* Reduce padding for smaller screens */
  }
`;

const Button = styled.button`
  background: #af1e1e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #9c4f55;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller font for mobile screens */
    padding: 8px 16px; /* Reduce padding for smaller screens */
  }
`;

const Step1 = ({ formData, updateFormData, nextStep }) => {
  const { t } = useTranslation();
  const [gender, setGender] = useState(formData.gender || "");

  // Validation functions
  const isValidName = (name) => /^[a-zA-Z\u0600-\u06FF\s]+$/.test(name);
  const isValidPhone = (phone) => /^\+\d{1,15}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidAge = (age) => {
    const num = Number(age);
    return num >= 16 && num <= 65;
  };

  // Initialize formState using useState
  const [formState, setFormState] = useState({
    name: { touched: false, isValid: isValidName(formData.name) },
    age: { touched: false, isValid: isValidAge(formData.age) },
    email: { touched: false, isValid: isValidEmail(formData.email) },
    phone: { touched: false, isValid: isValidPhone(formData.phone) },
    location: { touched: false, isValid: !!formData.location.trim() },
  });

  // Update formState when formData changes
  useEffect(() => {
    setFormState({
      name: { touched: false, isValid: isValidName(formData.name) },
      age: { touched: false, isValid: isValidAge(formData.age) },
      email: { touched: false, isValid: isValidEmail(formData.email) },
      phone: { touched: false, isValid: isValidPhone(formData.phone) },
      location: { touched: false, isValid: !!formData.location.trim() },
    });
  }, [formData]);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    updateFormData(field, value);
  };

  const handleBlur = (field, value) => {
    let isValid = true;
    if (field === "name") isValid = isValidName(value);
    if (field === "phone") isValid = isValidPhone(value);
    if (field === "email") isValid = isValidEmail(value);
    if (field === "age") isValid = isValidAge(value);
    if (field === "location") isValid = !!value.trim();

    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], touched: true, isValid },
    }));
  };

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
    updateFormData("gender", selectedGender);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["name", "email", "age", "phone", "location", "gender"];
    const formIsValid =
      requiredFields.every((field) => formData[field] && formData[field].trim() !== "") &&
      isValidName(formData.name) &&
      isValidPhone(formData.phone) &&
      isValidEmail(formData.email) &&
      isValidAge(formData.age); // Add age validation here

    if (formIsValid) {
      nextStep();
    } else {
      // Only mark invalid fields as touched
      setFormState((prev) => {
        const updatedState = { ...prev };
        for (let key of requiredFields) {
          let isValid = true;
          if (key === "name") isValid = isValidName(formData.name);
          if (key === "phone") isValid = isValidPhone(formData.phone);
          if (key === "email") isValid = isValidEmail(formData.email);
          if (key === "age") isValid = isValidAge(formData.age);
          if (key === "location") isValid = !!formData.location.trim();
          if (key === "gender") isValid = !!formData.gender;

          if (!isValid) {
            updatedState[key] = { ...updatedState[key], touched: true, isValid: false };
          }
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
      <Header>{t("step1.header")}</Header>
      <SubHeader>
        <span>{t("step1.subheader")}</span>
      </SubHeader>
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
              onBlur={(e) => handleBlur("name", e.target.value)}
              required
              className={
                formState.name.touched && (!formState.name.isValid || !formData.name.trim())
                  ? "is-invalid"
                  : formState.name.touched
                  ? "is-valid"
                  : ""
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
              onBlur={(e) => handleBlur("age", e.target.value)}
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
              onBlur={(e) => handleBlur("email", e.target.value)}
              required
              className={
                formState.email.touched && (!formState.email.isValid || !formData.email.trim())
                  ? "is-invalid"
                  : formState.email.touched
                  ? "is-valid"
                  : ""
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
              onBlur={(e) => handleBlur("phone", e.target.value)}
              required
              className={
                formState.phone.touched && (!formState.phone.isValid || !formData.phone.trim())
                  ? "is-invalid"
                  : formState.phone.touched
                  ? "is-valid"
                  : ""
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
              onBlur={(e) => handleBlur("location", e.target.value)}
              required
              className={
                formState.location.touched && !formData.location.trim()
                  ? "is-invalid"
                  : formState.location.touched
                  ? "is-valid"
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