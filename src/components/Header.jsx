import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 6vh;
  color: white;
`;

const Logo = styled.div`
  img {
    width: 100px;
    height: auto;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 3vh;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 2vh;

  a {
    color: white;
    font-size: 2.4vh;
    transition: color 0.3s;

    &:hover {
      color: orange;
    }
  }
`;

const LanguageDropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8vh;
  background: none;
  border: none;
  color: white;
  font-size: 2.2vh;
  cursor: pointer;

  i {
    font-size: 2.2vh;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 0.5vh);
  right: 0;
  background: #333;
  border-radius: 0.5vh;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 10;

  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 12vh;

  li {
    padding: 1.5vh 2vh;
    font-size: 2vh;
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
        margin-left: 1vh;
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

  // Retrieve the stored language or default to French
  const storedLanguage = localStorage.getItem('language') || 'fr';
  const [selectedLanguage, setSelectedLanguage] = useState(storedLanguage);

  useEffect(() => {
    const currentLanguage = i18n.language || 'fr'; // Default to 'fr' if no language is set
    setSelectedLanguage(currentLanguage); // Sync the dropdown with the actual current language
    localStorage.setItem('language', currentLanguage); // Ensure local storage is updated
  }, [i18n.language]);
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code);
    setIsDropdownOpen(false);
    localStorage.setItem('language', code); // Update the local storage language
    navigate(`/home/${code}`); // Navigate to the home page in the selected language
  };

  return (
    <Navbar>
      <Logo>
        <img src="/img/logo.png" alt="Logo" />
      </Logo>

      <NavIcons>
        <SocialIcons>
          <a href="#instagram" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#whatsapp" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </SocialIcons>

        <LanguageDropdownContainer>
          <DropdownButton onClick={toggleDropdown}>
            <i className="fas fa-globe"></i>
            {languages.find((lang) => lang.code === selectedLanguage)?.label}
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
