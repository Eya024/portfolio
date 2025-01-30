import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import SubscriptionSection from "../components/SubscriptionSection";
import GalleryPhotos from "../components/GalleryPhotos";
import GridSection from "../components/GridSection";
import AnimatedSection from "../components/AnimatedSection";
import AboutMe from "../components/AboutMe";

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
                  url('/img/resources/coachh.jpeg') no-repeat center center/cover;
      z-index: -1; /* Place the pseudo-element behind the content */
    }
  }

  /* Background for smaller screens */
  @media (max-width: 768px) {
    background: linear-gradient(
        to bottom,
rgb(0, 0, 0),
rgb(36, 0, 0),
rgb(0, 0, 0),

rgb(41, 0, 0),
        #250104,
        rgb(0, 0, 0)

      );
    background-size: cover; /* Ensure the gradient covers the entire container */
    background-position: center; /* Center the gradient */
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
        <GalleryPhotos />
      </AnimatedSection>

      <AnimatedSection>
        < AboutMe />
      </AnimatedSection>

      <AnimatedSection>
        < SubscriptionSection />
      </AnimatedSection>

      <AnimatedSection>
        <GridSection />
      </AnimatedSection>
    </HomeContainer>
  );
};

export default Home;