import React from 'react';
import styled from 'styled-components';

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 6vh; /* Increased padding for a wider header */
  color: white;
`;

const Logo = styled.div`
  img {
    width: 100px; /* Adjust the width of the logo as needed */
    height: auto; /* Maintain aspect ratio */
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 3vh; /* Increased spacing between icons */
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2.6vh; /* Increased icon size */
  cursor: pointer;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 2vh; /* Increased spacing between social icons */

  a {
    color: white;
    font-size: 2.4vh; /* Increased social icon size */
    transition: color 0.3s;

    &:hover {
      color: orange;
    }
  }
`;

const Header = () => {
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
      </NavIcons>
    </Navbar>
  );
};

export default Header;
