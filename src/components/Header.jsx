import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const Navbar = styled.header`
  display: flex;
  flex-direction: column; /* Stack items by default */
  align-items: center;
  padding: 3vh 6vw;
  color: white;

  @media (min-width: 768px) {
    flex-direction: row; /* Switch to row layout for larger screens */
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-bottom: 2vh; /* Add spacing between the logo and items below on mobile */

  img {
    width: 6rem;
    height: auto;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    margin-bottom: 0; /* Remove spacing for larger screens */
  }
`;

const NavIcons = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically on mobile */
  align-items: center;
  gap: 1.5vh;

  @media (min-width: 768px) {
    flex-direction: row; /* Arrange items in a row on larger screens */
    gap: 2vw;
    align-items: center; /* Align icons properly in a row */
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5vw;

  a {
    color: white;
    font-size: 1.8rem;
    transition: color 0.3s;

    &:hover {
      color: orange;
    }
  }

  @media (max-width: 768px) {
    justify-content: center; /* Center icons on smaller screens */
  }
`;

const LanguageDropdownContainer = styled.div`
  position: relative;
  display: flex; /* Make sure the dropdown is part of the flex container */
  align-items: center; /* Ensure the dropdown aligns with the other icons */

  @media (max-width: 768px) {
    margin-top: 0; /* Remove margin on small screens */
  }

  @media (min-width: 768px) {
    margin-top: 0; /* Ensure no top margin on large screens */
  }
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;

  i {
    font-size: 1.6rem;
  }

  span {
    @media (max-width: 768px) {
      display: none; /* Hide the language label on smaller screens */
    }
  }
`;


const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: #333;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 10;

  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 10rem;

  li {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: #444;
    }

    &.selected {
      color: orange;

      i {
        margin-left: 0.5rem;
      }
    }
  }
`;

const Header = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  const storedLanguage = localStorage.getItem('language') || 'fr';
  const [selectedLanguage, setSelectedLanguage] = useState(storedLanguage);

  useEffect(() => {
    const currentLanguage = i18n.language || 'fr';
    setSelectedLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
  }, [i18n.language]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code);
    setIsDropdownOpen(false);
    localStorage.setItem('language', code);
    navigate(`/home/${code}`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Navbar>
      <Logo onClick={handleLogoClick}>
        <img src="/img/logo.png" alt="Logo" />
      </Logo>

      <NavIcons>
        <SocialIcons>
          <a href="https://www.instagram.com/mo_coaching1/" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#whatsapp" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </SocialIcons>

        <LanguageDropdownContainer>
          <DropdownButton onClick={toggleDropdown}>
            <i className="fas fa-globe"></i>
            <span>{languages.find((lang) => lang.code === selectedLanguage)?.label}</span>
          </DropdownButton>
          {isDropdownOpen && (
            <DropdownMenu>
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  className={selectedLanguage === lang.code ? 'selected' : ''}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  {lang.label}
                  {selectedLanguage === lang.code && <i className="fas fa-check"></i>}
                </li>
              ))}
            </DropdownMenu>
          )}
        </LanguageDropdownContainer>
      </NavIcons>
    </Navbar>
  );
};

export default Header;
