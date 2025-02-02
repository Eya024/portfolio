import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    location: "",
    gender: "",
    height: "",
    weight: "",
    objective: null,
    availability: null,
  });

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
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
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleObjectiveSelection}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            updateFormData={updateFormData}
            onFinish={handleAvailabilitySelection}
            onBack={prevStep}
          />
        );
      case 5:
        return <Step5 formData={formData} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default MultiStepForm;