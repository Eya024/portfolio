import React from 'react';
import styled from 'styled-components';

const HeroSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4vh 8vh; /* 40px 80px */
  height: 100vh;
  color: white;
`;

const Content = styled.div`
  max-width: 50%;
`;

const Title = styled.h1`
  font-size: 6vh; /* 60px */
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 2vh; /* 20px */
  color: white;

  span {
    color: #f36100;
  }
`;

const Subtitle = styled.p`
  font-size: 2.2vh; /* 22px */
  color: #d3d3d3;
  margin-bottom: 3vh; /* 30px */
`;

const StartButton = styled.button`
  padding: 1.5vh 3vh; /* 15px 30px */
  font-size: 2vh; /* 20px */
  color: black;
  background: #f36100;
  border: none;
  border-radius: 0.5vh; /* 5px */
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1vh; /* 10px */
  transition: background 0.3s ease;

  &:hover {
    background: #f36100;
  }

  i {
    font-size: 1.8vh; /* 18px */
  }
`;

const ImageContainer = styled.div`
  max-width: 40%;
  border-radius: 1vh; /* 10px */
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const HeroSection = () => {
    return (
        <HeroSectionContainer>
            <Content>
                <Title>
                    Transform Your <span>Body</span> <br />
                    Your <span>Life</span>
                </Title>
                <Subtitle>
                    Discover your best version with personalized programs and professional guidance.
                </Subtitle>
                <StartButton>
                    Start Now <i className="fas fa-arrow-right"></i>
                </StartButton>
            </Content>
            <ImageContainer>
                <img
                    src="/img/hero/hero-1.jpg"
                    alt="Body Transformation"
                />
            </ImageContainer>
        </HeroSectionContainer>
    );
};

export default HeroSection;
