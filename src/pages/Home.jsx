import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import SubscriptionSection from "../components/SubscriptionSection";
import GalleryPhotos from "../components/GalleryPhotos";
import GridSection from "../components/GridSection";


import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('/img/resources/coach.jpeg') no-repeat center center/cover; /* Apply transparency with linear-gradient */
  background-attachment: fixed; /* Keeps the background fixed while scrolling */
  min-height: 100vh;
  color: white;
`;



const Home = () => {
    return (
        <HomeContainer>
            <Header />
            <HeroSection />
            <GallerySection />
            <SubscriptionSection />
            <GalleryPhotos />
            <GridSection />
        </HomeContainer>
    );
};

export default Home;
