import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";
import LogoDesign from "./NoCableNeededLogo.png";
import RegisterProcess from "./RegisterProcess";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';

function Header({ isLoggedIn }) {
  const [navbar, setnavbar] = useState(false);
  const signedInUser = localStorage.getItem("Username");
  const signedInUserType = localStorage.getItem("UserType");
  const [UserOptionClicked, setUserOptionClicked] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      setnavbar(true);
    } else {
      setnavbar(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  const [SignUpOverlay, setSignUpOverlay] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function SignUpClicked() {
    setSignUpOverlay(!SignUpOverlay);
  }
  function HomeClicked() {
    navigate("/");
  }

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };
  const handleBlur = () => {
    setIsClicked(false);
  };

  function UserClicked() {
    setUserOptionClicked(!UserOptionClicked);
  }



  return (
    <Wrapper className={navbar ? "wrapperActive" : "wrapper"}>
      <div className={navbar ? "wrapperActive" : "wrapper"}>
        <img alt="Logo" className="LogoName" src={LogoDesign} onClick={HomeClicked} />
        <div className="HeaderContent">
          <div className="MenuItems">
            <div className="SearchInput">
              <motion.input
                className="InputFieldHeader"
                placeholder="Search here"
                type="text"
                initial={{ width: "250px" }}
                animate={{ width: isClicked ? "300px" : "250px" }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                onClick={handleClick}
                onBlur={handleBlur}
                autoComplete="off"

              />

              <SearchIcon className="SearchIcon" />
            </div>
          </div>

          {signedInUser == null && (
            <>
              <Button
                variant="text"
                className="ButtonHolder"
                onClick={SignUpClicked}
              >
                <p className="RegisterText">Sign Up</p>
              </Button>
            </>
          )}

          {signedInUser != null &&
            <div className="UserDisplay" onClick={UserClicked}>
              <PersonIcon className="UserImage" />
            </div>
          }



          {/* {isLoggedIn && (
            <>
              <Button
                className="ButtonHolder"
                variant="text"
                onClick={HomeClicked}
              >
                <p className="RegisterText">Sign Out</p>
              </Button>
            </>
          )} */}
        </div>
      </div>
      {SignUpOverlay && <RegisterProcess updateParentValue={SignUpClicked} />}


      <AnimatePresence>
        {
          UserOptionClicked &&

          <motion.div
            className="MenuHolder"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <p
              className="MenuItem"
              onClick={() => {
                if (signedInUserType == 'admin') {
                  navigate("/AdminPortal");
                }
                else {
                  navigate("/UserProfile");
                }
              }}
            >My Account</p>
            <p
              className="MenuItem2"
              onClick={() => {
                localStorage.removeItem('Username');
                setUserOptionClicked(false);
                navigate("/");
              }}
            >Log Out</p>
          </motion.div>

        }
      </AnimatePresence>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    
    transition: opacity 0.3s ease, border-radius 0.3s ease, background-color 0.3s ease;
  }
  .wrapperActive {
    position: fixed;
    top: 0;
    width: 100%;
    height: 12%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* opacity: 1; */
    background-color: rgba(249, 249, 249, 0.85);
    transition: opacity 0.3s ease, border-radius 0.3s ease, background-color 0.3s ease;
  }
  .HeaderContent {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  .RegisterText {
    font-size: 14px;
    color: #1c1f25;
    font-weight: 100;
    text-align: center;
  }

  .SignInText {
    font-size: 15px;
    color: white;
    font-weight: 100;
  }
  .LogoName {
    height: 150px;
    padding-left: 10px;
    color: white;
  }
  .LogoName:hover {
    cursor: pointer;
  }
  .SearchInput {
    position: relative;
    margin-right: 180px;
  }
  .SearchIcon {
    position: absolute;
    left: 8px;
    top: 4px;
    color: #1c1f25;
    font-size: 31px;
  }

  .InputFieldHeader {
    height: 30px;
    border-radius: 10px;
    background: transparent;
    border: 0.01px solid grey;
    padding: 5px;
    font-size: 16px;
    padding: 2px;
    color: #1c1f25;
    text-align: center;
  }

  .InputFieldHeader:focus {
    outline: none;
  }
  .InputFieldHeader::placeholder {
    font-size: 14px;
    padding: 2px;
    color: #1c1f25;
    text-align: right;
    padding-right: 50px;
  }

  .NavbarText {
    font-size: 100px;
  }

  .headerImage {
    height: 100%;
    margin-left: 0px;
  }
  .menuIcon {
    display: none;
  }
  .MenuItems {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 50%;
    margin-right: 5%;
  }
  .HeaderButtonHolder {
    border-radius: 7px;
    height: 40px;
    width: 40%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .HeaderButtonHolder:hover {
    cursor: pointer;
    background-color: #3f3f40;
  }
  .headerImage:hover {
    cursor: pointer;
  }
  .RegisterText:hover {
    cursor: pointer;
  }
  .SignInText:hover {
    cursor: pointer;
  }
  .HeaderButtonHolder:hover .ButtonText {
    color: white;
  }

  .ButtonText {
    padding: 0 20px;
    font-size: 15px;
    font-weight: 100;
    color: white;
    text-align: center;
  }
  .MenuButton {
    font-size: 19px;
    font-weight: 100;
    color: white;
  }

  .MenuButton:hover {
    cursor: pointer;
  }
  .NavbarText {
    background-color: #bf3030;
  }

  .ButtonHolder{
    background-color: transparent;
  }

  .ButtonHolder:hover{
  }

  .UserDisplay{
    display:flex;
    align-items:center;
  }
  .UserDisplay:hover {
    cursor: pointer;
  }


  .UserImage{
      height:30px;
      width:30px;
      padding: 0.5rem;
      border-radius:50%;
      object-fit:cover;
      &:hover{
        -webkit-box-shadow: 10px 10px 23px -5px rgba(0,0,0,0.65);
        -moz-box-shadow: 10px 10px 23px -5px rgba(0,0,0,0.65);
        box-shadow: 10px 10px 23px -5px rgba(0,0,0,0.65);
        transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1) box-shadow;
      }
  }

  .MenuHolder{
    height:150px;
    width:150px;
    background-color:white;
    position:fixed;
    top:90px;
    right:10px;
    border-radius:10px;
    /* padding:5%; */
    z-index: 10;
    display:flex;
    flex-direction:column;
    align-items:center;
    -webkit-box-shadow: 10px 10px 23px -5px rgba(0,0,0,0.65);
    -moz-box-shadow: 10px 10px 23px -5px rgba(0,0,0,0.65);
    box-shadow: 10px 10px 23px -5px rgba(0,0,0,0.65);
  }
  
  .MenuItem2{
      font-size:18px;
      text-decoration:underline;
      text-decoration-thickness: 4px;
      text-decoration-color: red;
    }
  .MenuItem{
    
    font-size:18px;
    text-decoration:underline;
    text-decoration-thickness: 4px;
    text-decoration-color: red;
  }
  .UserDisplay{
    display:flex;
    align-items:center;
  }
  .UserDisplay:hover {
    cursor: pointer;
  }
  .MenuItem2:hover {
    cursor: pointer;
  }
  .MenuItem:hover {
    cursor: pointer;
  }
  //SMALL DEVICES MEDIA QUERY
  @media (max-width: 767px) {
    .wrapper {
      position: relative;
      height: 90px;
      width: 100%;
    }
    .RegisterText{
      font-size:14px;
      white-space: nowrap;
    }
    .ButtonHolder{
      margin-right:50%;
      
    }
    .ButtonHolder:hover{
      background-color: transparent;
    }
    .wrapperActive {
      position: relative;
      opacity: 1;
      height: 90px;
      width: 100%;
    }
    .headerImage {
      height: 50px;
      padding: 150px;
    }
    .LogoName {
      height: 150px;
      padding-top: 0px;
      padding-left: 25px;
      color: white;
      font-weight: 100;
    }

    .MenuItems {
      display: none;
    }
    .menuIcon {
      display: none;
      margin-right: 20px;
    }
    .wrapper {
      background-color: #f9f9f9;
    }
    .wrapperActive {
      background-color: #f9f9f9;
    }
  }
`;
export default Header;
