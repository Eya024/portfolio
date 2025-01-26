import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Styled components
const Step5Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  background: black;
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
  const navigate = useNavigate(); // Initialize navigate

  // Log formData to check values
  console.log(formData.objective, formData.availability);

  useEffect(() => {
    const phoneNumber = "+21629456425"; // Replace with your WhatsApp phone number
    const whatsappUrl = generateWhatsAppUrl(formData, phoneNumber, t);

    // Redirect to WhatsApp in the same tab
    window.location.href = whatsappUrl;

    // Add a fake entry to the browser history
    window.history.pushState(null, "", "/");

    // Listen for the popstate event (back button)
    const handlePopState = () => {
      navigate("/"); // Redirect to the home page
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [formData, t, navigate]); // Include navigate in the dependency array

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
  const { name, email, height, weight, objective, availability, gender, location } = formData;

  // Use the translation function `t` to fetch the translated labels
  const messageLabel = t("step5.message");

  const nameLabel = t("step5.name");
  const emailLabel = t("step5.email");

  const heightLabel = t("step5.height");
  const weightLabel = t("step5.weight");
  const objectiveLabel = t("step5.objective");
  const availabilityLabel = t("step5.availability");
  const genderLabel = t("step5.gender");
  const locationLabel = t("step5.location");
  const finalmessageLabel = t("step5.finalmessage");

  const objectives = [
    t("step5.objective1"),
    t("step5.objective2"),
    t("step5.objective3"),
    t("step5.objective4"),
    t("step5.objective5"),

  ];

  const availabilities = [
    t("step5.availability1"),
    t("step5.availability2"),
    t("step5.availability3"),
  ];

  return `
      ${messageLabel}
      ${nameLabel}: ${name},
      ${genderLabel}: ${gender},
      ${emailLabel}: ${email},
      ${heightLabel}: ${height} cm,
      ${weightLabel}: ${weight} kg,
      ${objectiveLabel}: ${objectives[objective]},
      ${availabilityLabel}: ${availabilities[availability]},
      ${locationLabel}: ${location}.${finalmessageLabel}
     `.trim();
};

const generateWhatsAppUrl = (formData, phoneNumber, t) => {
  const message = formatMessage(formData, t);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export default Step5;