// AnimatedSection.js (Create this file in your project)
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { fadeIn } from "./Animation";

const SectionWrapper = styled.section`
  opacity: 0; /* Start hidden */
  animation: ${({ isVisible }) => (isVisible ? fadeIn : "none")} 1s ease-in-out forwards;
`;

const AnimatedSection = ({ children }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // AnimatedSection.js
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log("Section is intersecting:", entry.isIntersecting); // Debugging
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target); // Stop observing after animation
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <SectionWrapper ref={sectionRef} isVisible={isVisible}>
            {children}
        </SectionWrapper>
    );
};

export default AnimatedSection;