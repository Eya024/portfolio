import React from "react";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";
import styled from "styled-components";

const InscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  padding: 2rem; /* Added padding to maintain spacing */
  position: relative; /* Ensure the pseudo-element is positioned correctly */

  /* Background for larger screens */
  @media (min-width: 769px) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('/img/hero/hero-2.jpg') no-repeat center center/cover;
    background-attachment: fixed; /* Keeps the background fixed while scrolling */
  }

  /* Gradient background for smaller screens */
  @media (max-width: 768px) {
    background: linear-gradient(
      to bottom,
      #000000, /* Black at the top */
      rgb(12, 0, 0) 25%, /* Dark red at 25% */
      rgb(57, 1, 2) 50%, /* Darker red in the middle */
      rgb(52, 0, 1) 75%, /* Red at 75% */
      rgb(29, 0, 1) /* Dark red at the bottom */
    );
    background-size: cover; /* Ensure the gradient covers the entire container */
    background-position: center; /* Center the background */
    position: static; /* Set position to static to fix flickering */
  }
`;

const Inscription = () => {
  return (
    <InscriptionContainer>
      <MultiStepForm />
    </InscriptionContainer>
  );
};

export default Inscription;