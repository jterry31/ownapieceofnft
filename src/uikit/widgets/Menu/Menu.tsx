import React, { useState, useEffect, useRef } from "react";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";

import { HamburgerMenu } from "react-hamburger-menu";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Expand from 'react-expand-animated';
import { useModal } from 'uikit'
import { PancakeRoundIcon, CogIcon, SvgProps } from "../../components/Svg";
import Overlay from "../../components/Overlay/Overlay";
import Text from "../../components/Text/Text";
import Dropdown from "../../components/Dropdown/Dropdown";
import Link from "../../components/Link/Link";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Skeleton from "../../components/Skeleton/Skeleton";
import Button from "../../components/Button/Button";
import Logo from "./Logo";
import Panel from "./Panel";
import HelpModal from '../../../views/Lottery/components/TicketCard/HelpModal'
import AboutModal from '../../../views/Lottery/components/TicketCard/AboutModal'
import HowModal from '../../../views/Lottery/components/TicketCard/HowModal'
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import * as IconModule from "./icons";
import { links2, socials, MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Avatar from "./Avatar";
import ContactForm from "../../../views/Lottery/components/ContactForm"

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon, LanguageIcon } = Icons;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  
  justify-content: space-between;
  align-items: center;
  // padding-left: 40px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  // background: #fff8de;
  background: #f6f4f5;
  // background: linear-gradient(344deg, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%);
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const LinkEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;

`;

const VerticalLine = styled.div<{marginSocials: string}>`
  border-left: 0.1vw solid rgba(0,0,0,0.2);
  height: 60%;
  margin-right: ${({ marginSocials }) => marginSocials};
`;

const Line = styled.div`
  border-bottom: 0.5px solid rgba(0,0,0,0.2);
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
`;


// const StyledLinks = styled.div<{ isMobile: boolean}>`
 // width: ${({ isMobile }) => (isMobile ? `10%` : '30%')};
const StyledLinks = styled.div<{linksMargin: string}>`
  display: flex;
  margin-left: ${({ linksMargin }) => linksMargin};
  width: 100%;
`;

const StyledLogo = styled.div<{width: string}>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: row;
  align-items: center;
  //margin-right: 90px;
`;

const MobileStyledLogo = styled.div`
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  //margin-right: 90px;
`;

const StyledFont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Fonts = styled.div<{fontSize: string}>`
  font-family: 'Allerta Stencil', sans-serif;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 900;
`;

const MobileFonts = styled.div`
  font-family: 'Allerta Stencil', sans-serif;
  font-size: 14px;
  font-weight: 900;
`;

const StyledDropdown = styled.div`
display: block;
// position: absolute;
width: 50%;
max-width: 100%;
margin-top: 64px;
margin-left: 40%;
background: rgb(244,244,244); // between navbar gray and connect wallet silver gray
background: linear-gradient(150deg, rgba(244,244,244,1) 0%, rgba(217,226,233,1) 78%);
border-radius: 16px;

`

const Socials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 100%;
  overflow-y: visible;
  
  // justify-content: space-between;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) =>  `0px`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  priceLink,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const refPrevOffset = useRef(window.pageYOffset);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(true);
        }
      }
      refPrevOffset.current = currentOffset;
    };


    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");
  const generalWidth = window.innerWidth;
  let contactWidth = 0;
  let logoWidth = "";
  let fontSize = "";
  let contactFontSize = "";
  let marginSocials = "";
  let linksMargin = "";

  if(generalWidth > 1500) {
    contactWidth = generalWidth*0.30;
    linksMargin = "25%"
    logoWidth = "50%";
    fontSize = "18px";
    contactFontSize = "16px";
    marginSocials = "3.5%";
  }

  else if(generalWidth > 1200) {
    contactWidth = generalWidth*0.30;
    linksMargin = "21%"
    logoWidth = "60%";
    fontSize = "18px";
    contactFontSize = "16px";
    marginSocials = "3.5%";
  }

  else if(generalWidth > 1000) {
    contactWidth = generalWidth*0.75;
    linksMargin = "28%"
    logoWidth = "30%";
    fontSize = "18px";
    contactFontSize = "16px";
    marginSocials = "3%";
  }
   
  else if(generalWidth > 760) {
    contactWidth = generalWidth*0.7;
    linksMargin = "28%"
    logoWidth = "40%";
    fontSize = "18px";
    marginSocials = "3%";
  }

  else if(generalWidth >= 580) {
    contactWidth = generalWidth*0.65;
    linksMargin = "28%"
    logoWidth = "50%";
    fontSize = "18px";
    marginSocials = "3.5%";
  }
   
  else if(generalWidth > 450) {
    contactWidth = generalWidth*0.75;
    linksMargin = "28%"
    logoWidth = "20%";
    fontSize = "18px";
    marginSocials = "4%";
  }

  else {
    contactWidth = generalWidth*0.72;
    linksMargin = "28%"
    logoWidth = "10%";
    fontSize = "18px";
    marginSocials = "4.5%";
  }
  
  
  

  const toggle = () => {
    if(open) setOpen(false)
    else setOpen(true)
  };

  const handleMenuClick = () => {
    if(menuOpen) setMenuOpen(false)
    else setMenuOpen(true)
  };

  const [onShowHelp] = useModal(<HelpModal />)
  const [onShowHow] = useModal(<HowModal />)
  const [onShowAbout] = useModal(<AboutModal />)
  
  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        {generalWidth < 580 ? 
           <PancakeRoundIcon width="65px" ml="1%" mr={marginSocials} mt="0px" name="Logo1.png" />
         :
         <StyledLogo width={logoWidth}>
            <PancakeRoundIcon width="65px" ml="10%" mt="0px" name="Logo1.png" />
              <StyledFont>
                <Fonts fontSize={fontSize}>
                  Own a Piece 
                </Fonts>
                <Fonts fontSize={fontSize}>
                  of NFT
                </Fonts>
              </StyledFont>
          </StyledLogo>
        }
          
        {/* <PancakeRoundIcon width="70px" mr="8px" ml="20px" mt="0px" name="Logo1.png" />
         <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href="/"
          isMobile={isMobile}
        /> */}
    
        {(generalWidth > 1200) && <StyledLinks linksMargin={linksMargin}>
          <LinkEntry>
            {links.map((link, index) => {
                const Icon1 = Icons[link.icon];
                const iconProps1 = { width: "32px", color: "textSubtle", style: { cursor: "pointer" } };
                const mr1 = index < links.length - 1 ? "16px" : "16px";
                if (link.items) {
                  return (
                    <Dropdown key={link.label} position="bottom" target={
                        <Text ml="8px" mr="24px" color="textSubtle">{link.label}</Text>

                    }>
                      {link.items.map((item) => (
                        <Link key={item.label} href={item.href} aria-label={item.label}>
                          <Text ml="8px" mr="8px" color="textSubtle"> {item.label} </Text>
                        </Link>
                      ))}
                    </Dropdown>
                  );
                }

                if(link.label === "FAQ") {
                return (
                  <div className="link" role="button" onClick={onShowHelp} onKeyDown={onShowHelp} tabIndex={0}>
                      <Text ml="8px" mr="8px" color="#000000"> {link.label} </Text>
                      <style>{`
                      .link:hover {
                        background: rgba(0,0,0,0.1);
                      }
                    `}</style>
                  </div>
                );
                
                }

                if(link.label === "About") {
                  return (
                    <div className="link" role="button" onClick={onShowAbout} onKeyDown={onShowAbout} tabIndex={0}>
                        <Text ml="8px" mr="8px" color="#000000"> {link.label} </Text>
                        <style>{`
                        .link:hover {
                          background: rgba(0,0,0,0.1);
                        }
                      `}</style>
                    </div>
                  );
                  
                  }

                if(link.label === "How It Works") {
                  return (
                    <div className="link" role="button" onClick={onShowHow} onKeyDown={onShowHow} tabIndex={0}>
                        <Text ml="20px" mr="20px" color="#000000"> {link.label} </Text>
                        <style>{`
                        .link:hover {
                          background: rgba(0,0,0,0.1);
                        }
                      `}</style>
                    </div>
                  );
                  
                  }
                
                return (
                 
                  <Link key={link.label} href={link.href} aria-label={link.label} mr={mr1}>
                      <Text ml="8px" mr="8px" color="#000000"> {link.label} </Text>
                  </Link>
               
                );

              })}
          </LinkEntry>
        
        </StyledLinks>}
      
        
        <div style={{display: "flex", flexDirection: "column", height:"100%", width: "100%"}}>
          <div style={{display: "flex", flexDirection: "row", position: "absolute", width: contactWidth, height: "100%", alignItems:"center", justifyContent: "flex-end"}}>           
            
                {(generalWidth > 1000) && <div style={{marginLeft: "8px", fontSize: contactFontSize, marginRight: marginSocials}}>Contact Us</div>}
                <VerticalLine marginSocials={marginSocials}/>

                
              
              
                
                <div role="button" onClick={toggle} onKeyDown={toggle} tabIndex={0} style={{marginRight: marginSocials}}> 
                  <img src="/images/mail6.png" width="20vw" height="16vw" alt=""/>
                </div>
                <a role="button" target="_blank" rel="noreferrer" href="https://t.me/OPONsupport" style={{marginRight: marginSocials}}> 
                  <img src="/images/telegram.png" width="20vw" height="16vw" alt=""/>
                </a>
                <a role="button" target="_blank" rel="noreferrer" href="https://twitter.com/ownapieceofnft" style={{marginRight: marginSocials}}> 
                  <img src="/images/twitter.png" width="20vw" height="16vw" alt=""/>    
                </a>

                {!(generalWidth > 1200) && 
                
                  <div role="button" onClick={handleMenuClick} onKeyDown={handleMenuClick} tabIndex={0} style={{marginRight: marginSocials}}> 
                    <img src="/images/hamb.png" width="20vw" height="16vw" alt=""/>    
                  </div>
                }   
                
                <VerticalLine marginSocials={marginSocials}/>
                <UserBlock account={account} login={login} logout={logout} />
                {/* {profile && <Avatar profile={profile} />} */}
          </div>
          <Expand open={open}>
                <ContactForm setOpen={setOpen} />
          </Expand>  
          {!(generalWidth > 1200) &&
            <Expand open={menuOpen}>
              <StyledDropdown>
                {links.map((link, index) => {

                if(link.label === "FAQ") {
                  return(
                    <div style={{height: "50px", paddingTop: "8%", paddingBottom: "8%"}}> 
                      <div role="button" onClick={onShowHelp} onKeyDown={onShowHelp} tabIndex={0} style={{marginLeft: "10%"}}> {link.label} </div>
                      <br />
                    </div>
                  );   
                  
                  }
                
                if(link.label === "About") {
                  return(
                    <div style={{height: "50px", paddingTop: "8%"}}> 
                      <div role="button" onClick={onShowAbout} onKeyDown={onShowAbout} tabIndex={0} style={{marginLeft: "10%"}}> {link.label} </div>
                      <br />
                    </div>
                  );   
                  
                }

                if(link.label === "How It Works") {
                  return(
                    <div style={{height: "50px", paddingTop: "8%"}}> 
                      <div role="button" onClick={onShowHow} onKeyDown={onShowHow} tabIndex={0} style={{marginLeft: "10%"}}> {link.label} </div>
                      <br />
                    </div>
                  );   
                  
                  }

                  return(
                    <div style={{height: "50px", paddingTop: "8%"}}> 
                      <a style={{marginLeft: "10%"}} href={link.href}> {link.label} </a>
                      <br />
                    </div>
                  );   
                })}

              </StyledDropdown>
            </Expand> 
          
          }
     
        </div>
      </StyledNav>
      <BodyWrapper>
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner> 
      
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
