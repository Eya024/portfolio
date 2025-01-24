import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const Logo = styled.div`
  position: absolute; /* Place it in the top-left corner */
  top: 3vh;
  left: 3vh;
  img {
    width: 100px;
    height: auto;
    cursor: pointer;
  }
`;

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
  margin-bottom: 10px;
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

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-bottom: 10px;
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
    const { height = "", weight = "" } = formData;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ height: "", weight: "" });

    const handleLogoClick = () => {
        navigate("/"); // Redirect to the home route
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
    };

    const handleInputChange = (fieldName, value) => {
        updateFormData(fieldName, value);
        validateField(fieldName, value);
    };

    const validateFields = () => {
        validateField("height", height);
        validateField("weight", weight);
        return !errors.height && !errors.weight;
    };

    const handleNext = () => {
        if (validateFields()) {
            nextStep();
        }
    };


    return (
        <Container>
            <Logo onClick={handleLogoClick}>
                <img src="/img/logo.png" alt="Logo" />
            </Logo>
            <Header>
                {t("step2.header")} <span>{t("step2.subheader")}</span>
            </Header>
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
                        className={errors.height ? "is-invalid" : ""}
                    />
                    {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}

                    <Input
                        type="number"
                        placeholder={t("step2.placeholders.weight")}
                        value={weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        className={errors.weight ? "is-invalid" : ""}
                    />
                    {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}

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
