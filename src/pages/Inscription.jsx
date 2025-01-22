import React from "react";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";



import styled from "styled-components";
import Step1 from "../components/MultiStepForm/Step1";
import Step2 from "../components/MultiStepForm/Step2";

const InscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('/img/hero/hero-2.jpg') no-repeat center center/cover; /* Apply transparency with linear-gradient */
  background-attachment: fixed; /* Keeps the background fixed while scrolling */
  min-height: 100vh;
  color: white;
`;



const Inscription = () => {
    return (
        <InscriptionContainer>
            <MultiStepForm />
            
        </InscriptionContainer>
    );
};

export default Inscription;
