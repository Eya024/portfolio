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
        age: "", // Add missing fields
        phone: "",
        location: "",
        gender: "", // Add gender field
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
        updateFormData("availability", availabilityIndex); // Update availability in formData
        nextStep(); // Move to the next step
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
                        formData={formData} // Pass formData to Step3
                        onNext={handleObjectiveSelection}
                        onBack={prevStep}
                    />
                );
            case 4:
                return (
                    <Step4
                        formData={formData}  // Pass formData to Step4
                        onFinish={handleAvailabilitySelection}
                        onBack={prevStep} // Pass the prevStep function as onBack
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
