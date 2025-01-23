import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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

const Step5 = ({ formData }) => {
    const { t } = useTranslation();
    
    useEffect(() => {
        const phoneNumber = "+21695404825"; // Replace with your WhatsApp phone number
        const whatsappUrl = generateWhatsAppUrl(formData, phoneNumber);

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    }, [formData]);

    return (
        <Step5Container>
            <Modal>
                <SuccessIcon>✔️</SuccessIcon>
                <Title>{t("step5.thankYou")}</Title>
                <Subtitle>{t("step5.redirecting")}</Subtitle>
            </Modal>
        </Step5Container>
    );
};

// Helper Functions
const formatMessage = (formData, t) => {
    const { name, email, height, weight, objective, availability } = formData;
    const objectives = [t("step5.objective1"), t("step5.objective2"), t("step5.objective3")];
    const availabilities = [t("step5.availability1"), t("step5.availability2"), t("step5.availability3")];

    return `
Hello! Here is the information submitted by the user:

Name: ${name}
Email: ${email}
Height: ${height} cm
Weight: ${weight} kg
Objective: ${objectives[objective]}
Availability: ${availabilities[availability]}
Thank you! `.trim();
};

const generateWhatsAppUrl = (formData, phoneNumber, t) => {
    const message = formatMessage(formData, t);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export default Step5;
