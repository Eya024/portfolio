import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Styled Components
const Section = styled.section`
  height: 100vh; /* Fill the entire viewport */
  padding: 0 5vw; /* Adjust padding */
  color: #fff;
  display: flex;
  flex-direction: column; /* Stack header and content */
  justify-content: space-between; /* Distribute header and content evenly */
  margin-bottom: 28vh;
`;





const Header = styled.header`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  margin: 2vh 0; /* Reduce vertical margin */
  color: white;

  span {
    color: #d3d3d3;
    font-weight: normal;
    display: block;
    font-size: 1.6rem;
    margin-top: 1vh;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    span {
      font-size: 1.4rem;
    }
  }
`;

const Content = styled.div`
  display: flex;
  gap: 2vw;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: flex-start; /* Align children to the top */
  flex-grow: 1; /* Ensure content takes available space */
  justify-content: center; /* Center content horizontally */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack on mobile screens */
    gap: 3vh;
    align-items: center; /* Center align on mobile */
  }
`;

const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  padding: 0;
  background: black;
  overflow: hidden;
  position: relative;
  aspect-ratio: 9 / 16; /* Maintain aspect ratio */
  transform: scale(0.7); /* Shrink the container */
  transform-origin: top center; /* Center the shrinking effect */
  height: auto; /* Allow height to adjust naturally */

  video {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensure the video fills the container */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
    padding: 0;
    margin-bottom: 3vh;
    aspect-ratio: 9 / 16; /* Maintain aspect ratio on mobile */
    transform: scale(1); /* Restore full size on mobile */
    align-items: center; /* Center-align the video */
  }
`;

const VideoList = styled.div`
  flex: 1; /* Take 1/3 of the space */
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
  }
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5vh;
  padding: 1.5vh;
  border: ${({ "data-is-active": isActive }) =>
    isActive ? "0.2rem solid #af1e1e" : "0.2rem solid transparent"};
  border-radius: 1rem;
  cursor: pointer;
  background: ${({ "data-is-active": isActive }) =>
    isActive ? "rgba(243, 97, 0, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;

  &:hover {
    background: ${({ "data-is-active": isActive }) =>
      isActive ? "rgba(243, 97, 0, 0.4)" : "rgba(255, 255, 255, 0.2)"};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Thumbnail = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const VideoTitle = styled.span`
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Helper function to compare two arrays deeply
const areArraysEqual = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  return array1.every(
    (video, index) =>
      video.title === array2[index].title &&
      video.videoUrl === array2[index].videoUrl &&
      video.thumbnail === array2[index].thumbnail
  );
};

const GallerySection = () => {
  const { t, i18n } = useTranslation();
  const videos = t("gallerySection.videos", { returnObjects: true });
  const [selectedVideo, setSelectedVideo] = useState(videos[0]); // Default to the first video
  const videoRef = useRef(null);

  // Track the previous videos array for comparison
  const previousVideosRef = useRef(videos);

  useEffect(() => {
    if (!areArraysEqual(previousVideosRef.current, videos)) {
      // Reset selectedVideo only if the videos array content has changed
      setSelectedVideo(videos[0]);
      previousVideosRef.current = videos; // Update the ref to the new videos array
    }
  }, [videos]); // Trigger when the videos array changes

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
              data-is-active={
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