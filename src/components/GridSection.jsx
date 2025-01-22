import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
  color: white;
`;

const GridItem = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    color: #bbb;
  }
`;

const Section = styled.section`
  text-align: center;
  padding: 60px 20px;
  color: white;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  button {
    background: #af1e1e;
    border: none;
    color: #000;
    padding: 15px 30px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #9c4f55;
    }
  }
`;

const GridSection = () => {
  return (
    <>
      <GridContainer>
        <GridItem>
          <h3>Personalized Program</h3>
          <p>A training plan adapted to your goals and level</p>
        </GridItem>
        <GridItem>
          <h3>Nutritional Guidance</h3>
          <p>Nutritional advice to optimize your results</p>
        </GridItem>
        <GridItem>
          <h3>Continuous Support</h3>
          <p>Direct access to your coach for regular follow-up</p>
        </GridItem>
      </GridContainer>
      <Section>
        <h2>Ready to Start Your Transformation?</h2>
        <p>Join our community and begin your journey to a better version of yourself.</p>
        <button>Start Now</button>
      </Section>
    </>
  );
};

export default GridSection;
