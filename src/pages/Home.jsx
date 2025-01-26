import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import SubscriptionSection from "../components/SubscriptionSection";
import GalleryPhotos from "../components/GalleryPhotos";
import GridSection from "../components/GridSection";
import AnimatedSection from "../components/AnimatedSection";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  padding: 2rem; /* Added padding to maintain spacing */
  position: relative; /* Ensure the pseudo-element is positioned correctly */

  /* Background for larger screens */
  @media (min-width: 769px) {
    &::before {
      content: '';
      position: fixed; /* Keep the background fixed relative to the viewport */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                  url('/img/resources/coachh.jpeg') no-repeat center center/cover;
      background-attachment: fixed; /* Make the background scroll with the page */
      z-index: -1; /* Place the pseudo-element behind the content */
    }
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

const Home = () => {
  return (
    <HomeContainer>
      <Header />
      {/* Wrap each section with AnimatedSection */}
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection>
        <GallerySection />
      </AnimatedSection>

      <AnimatedSection>
        <SubscriptionSection />
      </AnimatedSection>

      <AnimatedSection>
        <GalleryPhotos />
      </AnimatedSection>

      <AnimatedSection>
        <GridSection />
      </AnimatedSection>
    </HomeContainer>
  );
};

export default Home;