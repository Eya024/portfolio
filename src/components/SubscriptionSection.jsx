import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Section = styled.section`
  padding: 50px 20px;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #f36100;
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
  background-color: ${({ active }) => (active ? '#f36100' : '#333')};
  color: ${({ active }) => (active ? '#111' : '#fff')};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f36100;
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
  color: #f36100;
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
  background-color: #f36100;
  color: #111;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #111;
  }
`;



const SubscriptionSection = () => {
  const [currency, setCurrency] = useState('TND');
  
  const plans = [
    { duration: '1 Mois', price: 150, features: ['Personalized program', 'Nutritional guidance', '24/7 WhatsApp support', 'Access to exclusive videos'] },
    { duration: '2 Mois', price: 250, features: ['Personalized program', 'Nutritional guidance', '24/7 WhatsApp support', 'Access to exclusive videos'] },
    { duration: '3 Mois', price: 350, features: ['Personalized program', 'Nutritional guidance', '24/7 WhatsApp support', 'Access to exclusive videos'] },
    { duration: '6 Mois', price: 650, features: ['Personalized program', 'Nutritional guidance', '24/7 WhatsApp support', 'Access to exclusive videos'] }
  ];

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    // Implement conversion logic if needed
  };

  return (
    <Section>
      <Title>Mes Formules</Title>
      <Subtitle>Choisissez le programme qui correspond le mieux à vos objectifs. Tous les prix incluent un suivi personnalisé et un accès illimité au support.</Subtitle>
      <CurrencySwitcher>
        <CurrencyButton active={currency === 'TND'} onClick={() => handleCurrencyChange('TND')}>TND</CurrencyButton>
        <CurrencyButton active={currency === 'EUR'} onClick={() => handleCurrencyChange('EUR')}>EUR</CurrencyButton>
        <CurrencyButton active={currency === 'USD'} onClick={() => handleCurrencyChange('USD')}>USD</CurrencyButton>
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
            <BookButton>Book Now</BookButton>
          </PlanCard>
        ))}
      </PlansContainer>
    </Section>
  );
};

export default SubscriptionSection;

