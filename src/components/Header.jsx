import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Navbar = styled.header`
  display: flex;
  flex-direction: row; /* Default layout: row */
  justify-content: space-between; /* Space out logo and other items */
  align-items: center; /* Center items vertically */
  padding: 3vh 6vw;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column; /* Change to column layout for phone screens */
    justify-content: center; /* Center items vertically */
    align-items: center; /* Center items horizontally */
    padding: 2vh 4vw; /* Reduce padding for phone screens */
  }
`;

const Logo = styled.div`
  img {
    width: 9rem;
    height: auto;
    cursor: pointer;

    @media (max-width: 768px) {
      width: 10rem; /* Reduce logo size for phone screens */
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem; /* Add spacing between logo and other items */
  }
`;

const NavIcons = styled.div`
  display: flex;
  flex-direction: row; /* Arrange items in a row */
  align-items: center;
  gap: 2vw; /* Add spacing between items */

  @media (max-width: 768px) {
    gap: 1.5vw; /* Adjust spacing for phone screens */
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

    @media (max-width: 768px) {
      font-size: 1.4rem; /* Reduce icon size for phone screens */
    }
  }

  @media (max-width: 768px) {
    gap: 1.5vw; /* Adjust spacing for phone screens */
  }
`;

const LanguageDropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 0; /* Remove margin for phone screens */
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

    @media (max-width: 768px) {
      font-size: 1.4rem; /* Reduce globe icon size for phone screens */
    }
  }

  span {
    @media (max-width: 768px) {
      display: none; /* Hide the language label on phone screens */
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

  const whatsappNumber = '+33624405611'; // Replace with your phone number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <Navbar>
      <Logo onClick={handleLogoClick}>
        <img src="/img/logo.png" alt="Logo" />
      </Logo>

      <NavIcons>
        <SocialIcons>
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/mo_coaching1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>

          {/* WhatsApp Link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
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