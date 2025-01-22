import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    location: "",
    height: "",
    weight: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default MultiStepForm;
