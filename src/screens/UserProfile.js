import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import WatchHistory from "../components/WatchHistory";
import ChoosePlan from "../components/ChoosePlan";
import ReferralCodeShareOverlay from "../components/ReferralCodeShareOverlay";
import RedeemCode from "../components/RedeemCode";
import UpdateProfile from "../components/UpdateProfile";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [CurrentScreen, setCurrentScreen] = useState(4);
  const [SignInPrompt, setSignInPrompt] = useState(true);
  const [ReferralOverlay, setReferralOverlay] = useState();
  const isVerified = localStorage.getItem("isVerified");
  const signedInUser = localStorage.getItem("Username");
  const navigate = useNavigate();

  const handleValueUpdate = (newValue) => {
    setCurrentScreen(newValue);
  };
  const ReferralOverlayClicked = () => {
    setReferralOverlay(!ReferralOverlay);
  };
  useEffect(() => {
    if (isVerified === true) {
      setReferralOverlay(false);
    }
    else {
      setReferralOverlay(true);
    }
  },[isVerified])

  useEffect(() => {
    if (signedInUser === null) {
      navigate('/');
    }
  }, []);


  function ScreenDisplay() {
    if (CurrentScreen === 1) {
      return <WatchHistory />;
    }
    if (CurrentScreen === 2) {
      return <ChoosePlan />;
    }
    if (CurrentScreen === 3) {
      return <UpdateProfile />;
    }
    if (CurrentScreen === 4) {
      return (
        <RedeemCode />

      )

      ;
    }



  }
  const backgroundChange = () => {
    if (window.scrollY >= 10) {
      setSignInPrompt(false);
    } else {
      setSignInPrompt(true);
    }
  };
  window.addEventListener("scroll", backgroundChange);


  return (
    <Wrapper>
      <Header isLoggedIn={true} />

      { isVerified === 'true' &&
        <div className="FlexRowDiv">
          <SideBar updateParentValue={handleValueUpdate} />
          {ScreenDisplay()}
          <div className="LightEffect"></div>
        </div>
      }
      {isVerified === 'false' && (
        <ReferralCodeShareOverlay updateParentValue={ReferralOverlayClicked} />
      )}
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  background-color: #f9f9f9;
  .LightEffect {
    border-radius: 150px 0 0 150px; /* The first two values (150px 150px) define the top-left and top-right radii, while the last two (0 0) define the bottom-left and bottom-right radii, making them 0 to create a straight edge */
    opacity: 0.800000011920929;
    background: #bb434d;
    filter: blur(100px);
    width: 150px;
    z-index: 1;
    height: 350px;
    position: absolute;
    right: 0px;
    top: 75%;
  }

  .FlexRowDiv {
    display: flex;
    flex-direction: row;
    width:100%;
    height:100%;
  }

  @media (max-width: 767px) {
    .FlexRowDiv {
      display: flex;
      flex-direction: column;
    }
    .LightEffect {
      display: none;
    }
  }
`;
export default UserProfile;
