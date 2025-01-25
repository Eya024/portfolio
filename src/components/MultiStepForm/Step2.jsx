import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  background: url("background-image-url.jpg") no-repeat center center/cover;
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
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Header = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 0;

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

  @media (max-width: 768px) {
    span {
      font-size: 0.9rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => {
    if (props.isFocused) return "#ffc107"; // Yellow border when focused
    if (props.isInvalid) return "#dc3545"; // Red border when invalid
    return "#444"; // Default border color
  }};
  border-radius: 8px;
  background: #222;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-bottom: 10px;
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

const Step2 = ({ formData = {}, updateFormData, nextStep, prevStep }) => {
  const { height = "", weight = "" } = formData;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ height: "", weight: "" });
  const [touched, setTouched] = useState({ height: false, weight: false });
  const [focused, setFocused] = useState({ height: false, weight: false }); // Track focus state

  const handleLogoClick = () => {
    navigate("/");
  };

  const validateField = (fieldName, value) => {
    let error = "";

    if (fieldName === "height") {
      if (!value || isNaN(value) || value < 140 || value > 210) {
        error = t("step2.validationErrors.height");
      }
    }

    if (fieldName === "weight") {
      if (!value || isNaN(value) || value < 40 || value > 250) {
        error = t("step2.validationErrors.weight");
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    return !error; // Return true if valid, false if invalid
  };

  const handleInputChange = (fieldName, value) => {
    updateFormData(fieldName, value); // Update form data on every change
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" })); // Clear error while typing
  };

  const handleBlur = (fieldName, value) => {
    validateField(fieldName, value); // Validate on blur
    setTouched((prev) => ({ ...prev, [fieldName]: true })); // Mark as touched
    setFocused((prev) => ({ ...prev, [fieldName]: false })); // Remove focus
  };

  const handleFocus = (fieldName) => {
    setFocused((prev) => ({ ...prev, [fieldName]: true })); // Add focus
  };

  const validateFields = () => {
    const isHeightValid = validateField("height", height);
    const isWeightValid = validateField("weight", weight);
    return isHeightValid && isWeightValid;
  };

  const handleNext = () => {
    // Mark all fields as touched
    setTouched({ height: true, weight: true });

    // Validate all fields
    const isHeightValid = validateField("height", height);
    const isWeightValid = validateField("weight", weight);

    // Only proceed to the next step if all fields are valid
    if (isHeightValid && isWeightValid) {
      nextStep();
    }
  };

  return (
    <Container>
      <Logo onClick={handleLogoClick}>
        <img src="/img/logo.png" alt="Logo" />
      </Logo>
      <Header>{t("step2.header")}</Header>
      <SubHeader>
        <span>{t("step2.subheader")}</span>
      </SubHeader>
      <FormContainer>
        <form>
          <Label>
            <span>{t("step2.measurements")}</span>
          </Label>
          <Input
            type="number"
            placeholder={t("step2.placeholders.height")}
            value={height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            onFocus={() => handleFocus("height")}
            onBlur={(e) => handleBlur("height", e.target.value)}
            isFocused={focused.height}
            isInvalid={touched.height && !!errors.height}
          />
          {touched.height && errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}

          <Input
            type="number"
            placeholder={t("step2.placeholders.weight")}
            value={weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            onFocus={() => handleFocus("weight")}
            onBlur={(e) => handleBlur("weight", e.target.value)}
            isFocused={focused.weight}
            isInvalid={touched.weight && !!errors.weight}
          />
          {touched.weight && errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}

          <ButtonGroup>
            <Button type="button" onClick={prevStep}>
              {t("step2.back")}
            </Button>
            <Button type="button" primary onClick={handleNext}>
              {t("step2.next")}
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Step2;