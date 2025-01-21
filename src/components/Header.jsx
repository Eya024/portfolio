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
  display: flex;
  align-items: center;
  font-size: 4vh; /* Increased logo size */
  font-weight: bold;

  .logo-icon {
    color: white;
    margin-right: 1vh; /* Increased spacing */
  }

  .logo-bar {
    color: #f36100;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 3vh; /* Increased spacing between menu items */

  a {
    color: white;
    text-decoration: none;
    font-size: 2.4vh; /* Increased menu item size */
    text-transform: uppercase;
    transition: color 0.3s;

    &:hover,
    &.active {
      color: #f36100;
    }
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
        <span className="logo-icon">GYM</span>
        <span className="logo-bar">M</span>
      </Logo>
      <NavLinks>
        <a href="#home" className="active">Home</a>
        <a href="#about">About Us</a>
        <a href="#classes">Classes</a>
        <a href="#services">Services</a>
        <a href="#team">Our Team</a>
        <a href="#pages">Pages</a>
        <a href="#contact">Contact</a>
      </NavLinks>
      <NavIcons>
        <SearchButton>
          <i className="fas fa-search"></i>
        </SearchButton>
        <SocialIcons>
          <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#twitter"><i className="fab fa-twitter"></i></a>
          <a href="#youtube"><i className="fab fa-youtube"></i></a>
          <a href="#instagram"><i className="fab fa-instagram"></i></a>
        </SocialIcons>
      </NavIcons>
    </Navbar>
  );
};

export default Header;
