import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Styled Components (unchanged)
const Section = styled.section`
  padding: 4vh 5vw;
  color: #fff;
`;

const Header = styled.header`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3vh;
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
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3vh;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  @media (max-width: 768px) {
    width: 100%;
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