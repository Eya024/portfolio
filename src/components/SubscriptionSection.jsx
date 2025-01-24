import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

// Styled Components
const Section = styled.section`
  padding: 50px 20px;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #af1e1e;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const CurrencySwitcher = styled.div`
  margin-bottom: 20px;
`;

const CurrencyButton = styled.button`
  background-color: ${({ active }) => (active ? '#af1e1e' : '#333')};
  color: ${({ active }) => (active ? '#111' : '#fff')};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;  margin-top:5px;

  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #af1e1e;
    color: #111;
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
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  color: #af1e1e;
  margin-bottom: 10px;
`;

const PlanPrice = styled.p`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 15px;
`;

const Currency = styled.span`
  font-size: 1rem;
  color: #aaa;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
`;

const Feature = styled.li`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const BookButton = styled.button`
  background-color: #af1e1e;
  color: #111;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold; /* Makes the text bold */
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #111;
  }
`;




const SubscriptionSection = () => {
    const { t } = useTranslation();
    const [currency, setCurrency] = useState("TND");
  
    const plans = [
      {
        duration: t("subscriptionSection.plans.1Month"),
        price: 150,
        features: [
          t("subscriptionSection.features.personalizedProgram"),
          t("subscriptionSection.features.nutritionalGuidance"),
          t("subscriptionSection.features.whatsappSupport"),
          t("subscriptionSection.features.exclusiveVideos"),
        ],
      },
      {
        duration: t("subscriptionSection.plans.2Months"),
        price: 250,
        features: [
          t("subscriptionSection.features.personalizedProgram"),
          t("subscriptionSection.features.nutritionalGuidance"),
          t("subscriptionSection.features.whatsappSupport"),
          t("subscriptionSection.features.exclusiveVideos"),
        ],
      },
      {
        duration: t("subscriptionSection.plans.3Months"),
        price: 350,
        features: [
          t("subscriptionSection.features.personalizedProgram"),
          t("subscriptionSection.features.nutritionalGuidance"),
          t("subscriptionSection.features.whatsappSupport"),
          t("subscriptionSection.features.exclusiveVideos"),
        ],
      },
      {
        duration: t("subscriptionSection.plans.6Months"),
        price: 650,
        features: [
          t("subscriptionSection.features.personalizedProgram"),
          t("subscriptionSection.features.nutritionalGuidance"),
          t("subscriptionSection.features.whatsappSupport"),
          t("subscriptionSection.features.exclusiveVideos"),
        ],
      },
    ];
  
    const handleCurrencyChange = (selectedCurrency) => {
      setCurrency(selectedCurrency);
    };
  
    return (
      <Section>
        <Title>{t("subscriptionSection.title")}</Title>
        <Subtitle>{t("subscriptionSection.subtitle")}</Subtitle>
        <CurrencySwitcher>
          <CurrencyButton
            active={currency === "TND"}
            onClick={() => handleCurrencyChange("TND")}
          >
            {t("subscriptionSection.currency.tnd")}
          </CurrencyButton>
          <CurrencyButton
            active={currency === "EUR"}
            onClick={() => handleCurrencyChange("EUR")}
          >
            {t("subscriptionSection.currency.eur")}
          </CurrencyButton>
          <CurrencyButton
            active={currency === "USD"}
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
              <BookButton>{t("subscriptionSection.bookNow")}</BookButton>
            </PlanCard>
          ))}
        </PlansContainer>
      </Section>
    );
  };
  
  export default SubscriptionSection;