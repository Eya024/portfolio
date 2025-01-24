import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import SubscriptionSection from "../components/SubscriptionSection";
import GalleryPhotos from "../components/GalleryPhotos";
import GridSection from "../components/GridSection";
import AnimatedSection from "../components/AnimatedSection"; // Import the AnimatedSection component

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  padding: 2rem; /* Added padding to maintain spacing */
  position: static; /* Set position to static to fix flickering */

  /* Background for larger screens */
  @media (min-width: 769px) {
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                  url('/img/resources/coach.jpeg') no-repeat center center/cover;
      z-index: -1; /* Place the pseudo-element behind the content */
    }
  }

  /* Background for smaller screens */
  @media (max-width: 768px) {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('/img/resources/coach.jpeg') no-repeat center center/cover;
    background-attachment: fixed; /* Fixed background on mobile */
    background-size: cover; /* Ensure the image covers the entire container */
    background-position: center; /* Center the background image */
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