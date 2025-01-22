import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
    objective: null, // Selected objective index
    availability: null, // Selected availability index
  });

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleObjectiveSelection = (objectiveIndex) => {
    updateFormData("objective", objectiveIndex);
    nextStep();
  };

  const handleAvailabilitySelection = (availabilityIndex) => {
    updateFormData("availability", availabilityIndex);
    nextStep();
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
      case 3:
        return (
          <Step3
            onNext={handleObjectiveSelection}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4
            onFinish={handleAvailabilitySelection}
            onBack={prevStep}
          />
        );
      default:
        return (
          <div>
            <h1>Form Submitted</h1>
            <p>Thank you for completing the form!</p>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        );
    }
  };

  return <div>{renderStep()}</div>;
};

export default MultiStepForm;
