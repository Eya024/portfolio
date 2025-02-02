import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom'; // Add useParams

// Keyframes for floating effect
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Styled Components
const Section = styled.section`
  padding: 50px 20px;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 2vh; /* Match margin-bottom in HeroSection */
  color: white; /* Match color in HeroSection */

  @media (max-width: 768px) {
    font-size: 3rem; /* Match responsive font size in HeroSection */
  }
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: #d3d3d3; /* Match color in HeroSection */
  margin-bottom: 3vh; /* Match margin-bottom in HeroSection */

  @media (max-width: 768px) {
    font-size: 1.4rem; /* Match responsive font size in HeroSection */
  }
`;

const CurrencySwitcher = styled.div`
  margin-bottom: 20px;
`;

const CurrencyButton = styled.button`
  background-color: ${({ 'data-active': active }) => (active ? '#af1e1e' : '#333')};
  color: ${({ 'data-active': active }) => (active ? '#111' : '#fff')};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  margin-top: 5px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  transform: translateY(0); /* Initial position */
  animation: ${float} 3s ease-in-out infinite; /* Apply the floating animation */

  &:hover {
    background-color: #af1e1e;
    color: #111;
    transform: translateY(-5px); /* Elevate the button on hover */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Add a shadow for depth */
  }
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const PlanCard = styled.div`
  background-color: #222;
  padding: 30px; /* Increased padding */
  border-radius: 10px;
  width: 300px; /* Increased width */
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px); /* Add a hover effect */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    max-width: 350px; /* Limit maximum width */
  }
`;

const PlanTitle = styled.h3`
  font-size: 2rem; /* Increased font size */
  color: #af1e1e;
  margin-bottom: 15px; /* Increased margin */
`;

const PlanPrice = styled.p`
  font-size: 2.5rem; /* Increased font size */
  color: #fff;
  margin-bottom: 20px; /* Increased margin */
`;

const Currency = styled.span`
  font-size: 1.2rem; /* Increased font size */
  color: #aaa;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
`;

const Feature = styled.li`
  font-size: 1.2rem; /* Increased font size */
  margin-bottom: 15px; /* Increased margin */
`;

const BookButton = styled.button`
  background-color: #af1e1e;
  color: white;
  border: none;
  padding: 0.5rem 2rem; /* Increased padding */
  font-size: 1.2rem; /* Increased font size */
  font-weight: bold; /* Makes the text bold */
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.3s ease;
  transform: translateY(0); /* Initial position */
  animation: ${float} 3s ease-in-out infinite; /* Apply the floating animation */

  &:hover {
    background-color: #fff;
    color: #111;
    transform: translateY(-5px); /* Elevate the button on hover */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Add a shadow for depth */
  }
`;

const SubscriptionSection = () => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState("EUR"); // Set EUR as the default currency
  const navigate = useNavigate();
  const { lang } = useParams(); // Extract the current language from the URL

  const plans = [
    {
      duration: t("subscriptionSection.plans.1Month"),
      price: 150,
      features: [
        t("subscriptionSection.features.personalizedProgram"),
        t("subscriptionSection.features.nutritionalGuidance"),
        t("subscriptionSection.features.whatsappSupport"),
      ],
    },
    {
      duration: t("subscriptionSection.plans.2Months"),
      price: 250,
      features: [
        t("subscriptionSection.features.personalizedProgram"),
        t("subscriptionSection.features.nutritionalGuidance"),
        t("subscriptionSection.features.whatsappSupport"),
      ],
    },
    {
      duration: t("subscriptionSection.plans.3Months"),
      price: 400,
      features: [
        t("subscriptionSection.features.personalizedProgram"),
        t("subscriptionSection.features.nutritionalGuidance"),
        t("subscriptionSection.features.whatsappSupport"),
      ],
    },
    {
      duration: t("subscriptionSection.plans.6Months"),
      price: 700,
      features: [
        t("subscriptionSection.features.personalizedProgram"),
        t("subscriptionSection.features.nutritionalGuidance"),
        t("subscriptionSection.features.whatsappSupport"),
      ],
    },
  ];

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
  };

  const handleBookNow = (plan) => {
    // Navigate to the WhatsApp confirmation page with the selected plan's details
    navigate(`/planInterest/${lang}`, { state: { plan, currency } });
  };

  return (
    <Section>
      <Title>{t("subscriptionSection.title")}</Title>
      <Subtitle>{t("subscriptionSection.subtitle")}</Subtitle>
      <CurrencySwitcher>
        {/* Remove TND button and keep EUR and USD */}
        <CurrencyButton
          data-active={currency === "EUR"} // Use data-active instead of active
          onClick={() => handleCurrencyChange("EUR")}
        >
          {t("subscriptionSection.currency.eur")}
        </CurrencyButton>
        <CurrencyButton
          data-active={currency === "USD"} // Use data-active instead of active
          onClick={() => handleCurrencyChange("USD")}
        >
          {t("subscriptionSection.currency.usd")}
        </CurrencyButton>
      </CurrencySwitcher>
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard key={index}>
            <PlanTitle>{plan.duration}</PlanTitle>
            <PlanPrice>
              {plan.price}.00 <Currency>{currency}</Currency>
            </PlanPrice>
            <FeatureList>
              {plan.features.map((feature, i) => (
                <Feature key={i}>✔️ {feature}</Feature>
              ))}
            </FeatureList>
            <BookButton onClick={() => handleBookNow(plan)}>
              {t("subscriptionSection.bookNow")}
            </BookButton>
          </PlanCard>
        ))}
      </PlansContainer>
    </Section>
  );
};

export default SubscriptionSection;