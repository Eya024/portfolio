import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Styled Components
const Section = styled.section`
  padding: 4vh 5vw; /* Use vh/vw for consistent padding */
  color: #fff;
`;

const Header = styled.header`
  font-size: 4rem; /* Use rem for consistent font sizing */
  font-weight: bold;
  text-align: center;
  margin-bottom: 3vh; /* Consistent spacing with HeroSection */
  color: white;

  span {
    color: #af1e1e;
    font-weight: bold;
    display: block;
    font-size: 2.5rem;
    margin-top: 1vh;
  }

  @media (max-width: 768px) {
    font-size: 3rem; /* Adjust font size for smaller screens */
    span {
      font-size: 2rem; /* Adjust subtitle size */
    }
  }
`;

const Content = styled.div`
  display: flex;
  gap: 2vw; /* Use relative units for spacing */
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  flex-direction: row; /* Default to row layout for PC screens */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack video container and list vertically on smaller screens */
    gap: 3vh; /* Add more space between the video container and list */
  }
`;

const VideoContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 1rem;
  max-width: 1000px;
  max-height: 500px;
  width: 100%;
  height: auto;
  background: black;
  overflow: hidden;
  position: relative;

  video {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin-bottom: 3vh;
    aspect-ratio: 16 / 9;
    max-width: none;
    max-height: none;
  }
`;

const VideoList = styled.div`
  flex: 1; /* Take up half of the screen on larger screens */
  display: flex;
  flex-direction: column;
  gap: 1.5vh; /* Add more space between the video items */

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5vh;
  padding: 1.5vh;
  border: ${({ isActive }) => (isActive ? "0.2rem solid #af1e1e" : "0.2rem solid transparent")};
  border-radius: 1rem;
  cursor: pointer;
  background: ${({ isActive }) =>
    isActive ? "rgba(243, 97, 0, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? "rgba(243, 97, 0, 0.4)" : "rgba(255, 255, 255, 0.2)"};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 1rem; /* Adjust padding on smaller screens */
  }
`;

const Thumbnail = styled.img`
  width: 4rem; /* Use rem for size */
  height: 4rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem; /* Adjust size for smaller screens */
  }
`;

const VideoTitle = styled.span`
  color: #fff;
  font-size: 1.2rem; /* Use rem for font size */
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
`;

const GallerySection = () => {
    const { t } = useTranslation();
    const videos = t("gallerySection.videos", { returnObjects: true });
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const videoRef = useRef(null);
  
    return (
      <Section>
        <Header>
          {t("gallerySection.header.title")}{" "}
          <span>{t("gallerySection.header.subtitle")}</span>
        </Header>
        <Content>
          <VideoContainer>
            <video
              ref={videoRef}
              src={selectedVideo.videoUrl}
              controls
              disablePictureInPicture
              controlsList="nodownload"
            />
          </VideoContainer>
          <VideoList>
            {videos.map((video, index) => (
              <VideoItem
                key={index}
                onClick={() => {
                  setSelectedVideo(video);
                  if (videoRef.current) videoRef.current.pause(); // Pause before switching
                }}
                isActive={
                  selectedVideo.title === video.title &&
                  selectedVideo.videoUrl === video.videoUrl
                }
              >
                <Thumbnail src={video.thumbnail} alt={video.title} />
                <VideoTitle>{video.title}</VideoTitle>
              </VideoItem>
            ))}
          </VideoList>
        </Content>
      </Section>
    );
  };
  
  export default GallerySection;