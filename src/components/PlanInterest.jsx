import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

// Styled components
const Step5Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/img/hero/hero-1.jpg") no-repeat center center fixed;
  background-size: cover;
`;

const Modal = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px 60px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  color: white;
  max-width: 400px;
  width: 90%;
`;

const SuccessIcon = styled.div`
  background: #ffd700;
  color: #000;
  font-size: 60px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 auto 20px;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #d3d3d3;
  margin-bottom: 40px;
`;

const PlanInterest = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const phoneNumber = "+21695404825"; // Replace with your WhatsApp phone number
  const navigate = useNavigate();
  const { plan, currency } = location.state || {};

  useEffect(() => {
    if (!plan) {
      // If no plan data is found, redirect back to the subscription page
      navigate("/");
      return;
    }

    // Construct the WhatsApp message using the translation with interpolation
    const message = t("whatsappConfirmation.whatsappMessage", {
      duration: plan.duration,
      price: plan.price,
      currency: currency,
    });
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp after a short delay
    const redirectTimer = setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 3000); // 3-second delay before redirecting

    // Cleanup the timer
    return () => clearTimeout(redirectTimer);
  }, [plan, currency, navigate, t]);

  return (
    <Step5Container>
      <Modal>
        <SuccessIcon>✔️</SuccessIcon>
        <Title>{t("whatsappConfirmation.thankYou")}</Title>
        <Subtitle>{t("whatsappConfirmation.redirecting")}</Subtitle>
      </Modal>
    </Step5Container>
  );
};

export default PlanInterest;