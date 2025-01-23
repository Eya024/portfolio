import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Styled Components
const Section = styled.section`
  padding: 2rem;
  color: #fff;
`;

const Header = styled.header`
  font-size: 6vh; /* Match the font size of the Hero Title */
  font-weight: bold;
  text-align: center;
  margin-bottom: 3vh; /* Add spacing consistent with HeroSection */
  color: white; /* Match the text color in HeroSection */

  span {
    color: #af1e1e; /* Match the yellow color in HeroSection */
    font-weight: bold; /* Ensure normal weight for the span */
    display: block; /* Keep the span on a separate line */
    font-size: 4vh; /* Slightly smaller than the main title */
    margin-top: 1vh; /* Add space between the title and subtitle */
  }
`;

const Content = styled.div`
  display: flex;
  gap: 1rem;
`;

const VideoContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 1rem;
  max-width: 1000px; /* Set the maximum width to make it smaller */
  max-height: 500px; /* Set the maximum height if necessary */
  width: 100%; /* Make it responsive */
  height: auto; /* Keep the aspect ratio */
`;

const VideoList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border: ${({ isActive }) => (isActive ? "1px solid #af1e1e" : "2px solid transparent")};
  border-radius: 10px;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? "rgba(243, 97, 0, 0.2)" : "rgba(255, 255, 255, 0.1)")};
  transition: transform 0.2s ease-in-out;

  &:hover {
    background: ${({ isActive }) => (isActive ? "rgba(243, 97, 0, 0.33)" : "rgba(255, 255, 255, 0.2)")};
    transform: scale(1.05);
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

const VideoTitle = styled.span`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
`;

const GallerySection = () => {
  const { t } = useTranslation();
  const videos = t("gallerySection.videos", { returnObjects: true });
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <Section>
      <Header>
        {t("gallerySection.header.title")}{" "}
        <span>{t("gallerySection.header.subtitle")}</span>
      </Header>
      <Content>
        <VideoContainer>
          <video
            src={selectedVideo.videoUrl}
            controls
            autoPlay
            style={{ borderRadius: "10px", width: "100%", height: "100%" }}
          />
        </VideoContainer>
        <VideoList>
          {videos.map((video, index) => (
            <VideoItem
              key={index}
              onClick={() => setSelectedVideo(video)}
              isActive={selectedVideo.title === video.title && selectedVideo.videoUrl === video.videoUrl}
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
