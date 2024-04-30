import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import SignIn from "../components/SignIn";
import { motion } from "framer-motion";
import "../ScrollBar.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import RegisterProcess from "../components/RegisterProcess";
import SportsImage from "./PngItem_1155153.png";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import EspnLogo from "./ESPNLogo.png";
import NbaLogo from "./NBALogo.png";
import MlbLogo from "./MLBLogo.png";
import HboLogo from "./HBO-Sports-logo.jpg";
import NFLLogo from "./NFL.png";
import NHLLogo from "./NHL.jpeg";
import LiveLogo from "./liveLogo.png";


import TVLogo from "./TVLogo.png";

import LiveLogoImage from "./LiveLogoImage.png";



function Hero() {
  const navigate = useNavigate();
  const [SignUpOverlay, setSignUpOverlay] = useState(false);
  const [LoginDone, setLoginDone] = useState(false);
  const signedInUser = localStorage.getItem("Username");




  function LoginClicked() {
    setLoginDone(!LoginDone);
  }

  const updateSignInParentValue = (selectedFunction) => {
    if (selectedFunction === "functionOne") {
      navigate("/UserProfile");
    }
    else if (selectedFunction === "functionThree") {
      navigate("/AdminPortal");
    }
    else if (selectedFunction === "functionTwo") {
      LoginClicked();
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 700) {
      setIsVisible(true);
    }
    if (scrollY > 1500) {
      setIsVisible2(true);
    }
    if (scrollY > 1600) {
      setIsVisible4(true);
    }
    if (scrollY < 1550) {
      setIsVisible4(false);
    }
    if (scrollY > 1700) {
      setIsVisible3(true);
    }
  };
  window.addEventListener("scroll", handleScroll);

  function SignUpClicked() {
    setSignUpOverlay(!SignUpOverlay);
  }

  return (
    <Wrapper>
      {SignUpOverlay && <RegisterProcess updateParentValue={SignUpClicked} />}

      <Header />
      <Grid item container gap={2} className="balck">
        {LoginDone && (
          <SignIn updateSignInParentValue={updateSignInParentValue} />
        )}
        <div className="TitleHolder">
          <Grid item sm={8}>
            <div className="MainGriddiv">
              <p className="MainTitle">
                {" "}
                Unleashing the new era of digital streaming entertainment
              </p>
            </div>

            <div className="SubTitleHolder">
              <Grid item sm={8}>
                <div className="MainGriddiv">
                  <p className="MainSubTitle">
                    {" "}
                    Discover <span className="LocalTvText">
                      Live Local TV

                    </span>
                    <img src={TVLogo} className="LocalTvImage" />

                    and On-Demand Favorites
                  </p>
                </div>
              </Grid>
            </div>
            {signedInUser == null &&
              <div className="SubTitleHolder">
                <Grid item sm={8}>
                  <div className="MainGriddiv">
                    <Button
                      variant="contained"
                      className="MainButton"
                      onClick={SignUpClicked}
                    >
                      <p className="MainButtontext">Get Started</p>
                    </Button>

                    <Button
                      variant="contained"
                      className="MainButton2"
                      onClick={LoginClicked}
                    >
                      <p className="MainButtontext2" onClick={LoginClicked}>
                        Log In
                      </p>
                    </Button>
                  </div>
                </Grid>
              </div>
            }
          </Grid>
        </div>

        <div className="LightEffect"></div>

        <Grid item sm={20}>
          <div className="ImageGridHolder">
            <Grid item container gap={5}>
              <div className="HeroImages">
                <Grid item sm={2.5} xs={4}>
                  <motion.div
                    className="ImageHolder2"
                    initial={{ translateX: -200 }}
                    animate={{ translateX: 0 }}
                    transition={{ type: "tween", duration: 0.5 }}
                  >
                    <img
                      alt="something here"
                      className="Image1"
                      src="https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                    />
                  </motion.div>
                </Grid>
                <Grid item sm={2.5} xs={4}>
                  <motion.div
                    className="ImageHolder2"
                    initial={{ translateX: -200 }}
                    animate={{ translateX: 0 }}
                    transition={{ type: "tween", duration: 0.5 }}
                  >
                    <img
                      alt="something here"
                      className="Image2"
                      src="https://images.unsplash.com/photo-1575653294195-2f1b52f4d990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
                    />
                  </motion.div>
                </Grid>
                <Grid item sm={2.5} xs={3}>
                  <motion.div
                    className="ImageHolder2"
                    initial={{ translateX: -200 }}
                    animate={{ translateX: 0 }}
                    transition={{ type: "tween", duration: 0.5 }}
                  >
                    <img
                      alt="something here"
                      className="Image2"
                      src="https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                    />
                  </motion.div>
                </Grid>
                <Grid item sm={2.5}>
                  <motion.div
                    className="ImageHolder4"
                    initial={{ translateX: -200 }}
                    animate={{ translateX: 0 }}
                    transition={{ type: "tween", duration: 0.5 }}
                  >
                    <img
                      alt="something here"
                      className="Image2"
                      src="https://images.unsplash.com/photo-1579702493440-8b1b56d47e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                    />
                  </motion.div>
                </Grid>
              </div>
            </Grid>
          </div>
        </Grid>

        <motion.div
          className="ImageBlockHolder"
          initial={{ x: -100, opacity: 0 }}
          animate={isVisible ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Grid item container gap={2}>
            <Grid item sm={20}>
              <div>
                <p className="SubSectionTitle">
                  An Extensive Collection of Over Thousands of Movies and Shows
                </p>
                <p className="SubSectionSubTitle">
                  Unveiling the Cinematic Universe: Explore Thousands of Movies and
                  Shows
                </p>
              </div>
            </Grid>

            <Grid item sm={20}>
              <Grid item container gap={2}>
                <div className="BlockHolder">
                  <Grid item container gap={2}>
                    <Grid item sm={4} xs={7}>
                      <div className="BlockImage1">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        />
                      </div>
                    </Grid>
                    <Grid item sm={3} xs={4}>
                      <div className="BlockImage1">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src="https://images.unsplash.com/photo-1616097970275-1e187b4ce59f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        />
                      </div>
                    </Grid>
                    <Grid item sm={3} xs={11.5}>
                      <div className="BlockImage1">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            {/* Check ! */}
            <Grid item sm={20} className="Grid2Images">
              <Grid item container gap={2}>
                <div className="BlockHolder">
                  <Grid item container gap={2}>
                    <Grid item sm={3}>
                      <div className="BlockImage1">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src="https://images.unsplash.com/photo-1613380007620-b9612888117f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80"
                        />
                      </div>
                    </Grid>
                    <Grid item sm={3}>
                      <div className="BlockImage1">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        />
                      </div>
                    </Grid>
                    <Grid item sm={4}>
                      <div className="BlockImage1">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src="https://images.unsplash.com/photo-1616527546362-bf6b7f80a751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>

        <motion.div
          className="ImageBlockHolderSports"
          initial={{ x: -50, opacity: 0 }}
          animate={isVisible2 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Grid item container gap={2}>
            <Grid item sm={20}>
              <Grid item container gap={2}>
                <div className="BlockHolder">
                  <Grid item container gap={2} className="CenteringDiv">
                    <Grid item lg={4} md={2}>
                      <div className="SportsTitleHolder">
                        <p className="SubSectionTitleSports">
                          Unleashing the Athletic Universe: Dive into Over Thousands of
                          Sports Events and Games
                        </p>
                        <p className="SubSectionSubTitleSports">
                          Embark on a Journey through the Sporting World:
                          Discover Over Thousands of Sports Movies and Shows
                        </p>

                        <Grid container gap={2.5} className="CenteringDiv">
                          <Grid item sm={2.65} xs={2.5} className="LogoOuter">
                            <div className="LogoHolder">
                              <img src={NbaLogo} className="LogoImage" />
                            </div>
                          </Grid>
                          <Grid item sm={2.65} xs={2.5} className="LogoOuter">
                            <div className="LogoHolder">
                              <img src={MlbLogo} className="LogoImage" />
                            </div>
                          </Grid>
                          {/* <Grid item sm={2.65} xs={2.5} className="LogoOuter">
                            <div className="LogoHolder">
                              <img src={HboLogo} className="LogoImage" />
                            </div>
                          </Grid> */}
                          <Grid item sm={2.65} xs={2.5} className="LogoOuter">
                            <div className="LogoHolder">
                              <img src={EspnLogo} className="LogoImage" />
                            </div>
                          </Grid>

                          <Grid item sm={2.65} xs={2.5} className="LogoOuter">
                            <div className="LogoHolder">
                              <img src={NFLLogo} className="LogoImage" />
                            </div>
                          </Grid>

                          <Grid item sm={2.65} xs={2.5} className="LogoOuter">
                            <div className="LogoHolder">
                              <img src={NHLLogo} className="LogoImage" />
                            </div>
                          </Grid>

                        </Grid>
                        <Grid container gap={1} className="CenteringDiv"></Grid>
                      </div>
                    </Grid>
                    <Grid item sm={7} xs={11} lg={7}>
                      <div className="BlockImage1Sports">
                        <img
                          alt="something here"
                          className="Image1Block"
                          src={SportsImage}
                        />
                        <Grid item lg={3} sm={5.5} xs={8} className="LiveOuter">
                          <motion.div
                            className="LogoHolder"
                            initial={{ opacity: 0, x: 100 }}
                            animate={isVisible4 ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              type: "spring",
                              damping: 10,
                              stiffness: 100,
                            }}
                          >
                            <img src={LiveLogoImage} className="liveStreamLogo" />
                          </motion.div>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>

        {/* <div className="ReviewHolder">
          <Grid item container gap={2} className="CenteringDiv">
            <Grid item sm={10}>
              <div className="ReviewBox">
                <p className="ReviewTitle">What our client's say</p>
                <div className="SubTitleHolder">
                  <p className="ReviewSubTitle">
                    See what our customers say about us. It really matters for
                    us. How good or bad we make it for evaluation to make
                    CutTheCable better
                  </p>
                </div>

                <Grid item container gap={2} className="CenteringDiv">
                  <Grid item sm={2.5} xs={8}>
                    <motion.div
                      className="MainGriddivDemo"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        opacity: isVisible3 ? 1 : 0,
                        y: isVisible3 ? 0 : 50,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="ReviewCardInner">
                        <StarIcon className="StarIconGold" />
                        <StarIcon className="StarIconGold" />
                        <StarIcon className="StarIconGrey" />
                        <p className="ReviewText">
                          "I know in real-time where the money is spend, and I
                          dont have to lend out the company's credit card
                          anymore. What a relief !"
                        </p>
                        <p className="ReviewSubText">Adam Wein</p>
                      </div>
                    </motion.div>
                  </Grid>
                  <Grid item sm={2.5} xs={8}>
                    <motion.div
                      className="MainGriddivDemo"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        opacity: isVisible3 ? 1 : 0,
                        y: isVisible3 ? 0 : 50,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="ReviewCardInner">
                        <StarIcon className="StarIconGold" />
                        <StarIcon className="StarIconGold" />
                        <StarIcon className="StarIconGrey" />
                        <p className="ReviewText">
                          "I know in real-time where the money is spend, and I
                          dont have to lend out the company's credit card
                          anymore. What a relief !"
                        </p>
                        <p className="ReviewSubText">Adam Wein</p>
                      </div>
                    </motion.div>
                  </Grid>
                  <Grid item sm={2.5} xs={8}>
                    <motion.div
                      className="MainGriddivDemo"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        opacity: isVisible3 ? 1 : 0,
                        y: isVisible3 ? 0 : 50,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="ReviewCardInner">
                        <StarIcon className="StarIconGold" />
                        <StarIcon className="StarIconGold" />
                        <StarIcon className="StarIconGrey" />
                        <p className="ReviewText">
                          "I know in real-time where the money is spend, and I
                          dont have to lend out the company's credit card
                          anymore. What a relief !"
                        </p>
                        <p className="ReviewSubText">Adam Wein</p>
                      </div>
                    </motion.div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div> */}


        <Grid item container gap={2} className="CostDiv">
          <Grid item sm={10.5}>
            <div>
              <Grid item container gap={2} className="CostDiv">

                <Grid item lg={6.5} sm={6.5} xs={10}>
                  <div className="SavingTextHolder">
                    <p className="SavingTitle" style={{ color: '#bb434d' }}>
                      Discover Endless Entertainment with CutTheCable's 3-Day Free Trial!
                    </p>

                    <p className="SavingSubTitle" >
                      {" "}
                      Experience the magic of streaming without limits! Dive into a world of captivating shows, blockbuster movies, and exclusive content with CutTheCable's 3-day free trial. Unleash your inner couch potato—no credit card required, no subscription to cancel, just enjoy!
                    </p>
                  </div>
                </Grid>

                <Grid item sm={5} lg={4} xs={7}>
                  <div className="SavingImageHolder">
                    <img
                      alt="something here"
                      className="SavingImage"
                      src="./free-trial.jpg"
                    />
                  </div>
                  <Button
                    variant="contained"
                    className="ActionMainButton"
                    onClick={SignUpClicked}
                  >
                    <p className="MainButtontext" >Activate Now!</p>
                  </Button>
                </Grid>
              </Grid>


            </div>
          </Grid>
        </Grid>

        <Grid item container gap={2} className="CostDiv">
          <Grid item sm={10.5}>
            <div>
              <Grid item container gap={2} className="CostDiv">
                <Grid item sm={5} lg={4} xs={7}>
                  <div className="SavingImageHolder">
                    <img
                      alt="something here"
                      className="SavingImage"
                      src="https://cdn.dribbble.com/users/2118692/screenshots/15501998/media/e984df5df4265f5e849d0337443cef28.png"
                    />
                  </div>
                </Grid>
                <Grid item lg={6.5} sm={6.5} xs={10}>
                  <div className="SavingTextHolder">
                    <p className="SavingTitle">
                      Cut the Cable, Save More: Lowering Entertainment and
                      Maintenance Fees!
                    </p>

                    <p className="SavingSubTitle">
                      {" "}
                      Unlocking Affordable Fun and Hassle-Free Living!
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <div className="ActionHolder">
          <Grid item container gap={2} className="CenteringDiv">
            <Grid item sm={10}>
              <div className="ReviewBox">
                <div className="ActionInner">
                  <p className="ActionHolderTitleHolder">
                    Embark on an Entertainment Adventure
                  </p>
                  <p className="ActionHolderSubTitleHolder">
                    Step into the World of Entertainment: Join CutTheCable Today
                    and Discover Endless Fun!
                  </p>

                  {signedInUser == null &&
                    <Button
                      variant="contained"
                      onClick={SignUpClicked}
                      className="ActionMainButton"
                    >
                      <p className="MainButtontext">Get Started</p>
                    </Button>
                  }
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="LightEffect2"></div>
        </div>

        <Footer />
      </Grid>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  overflow-y: hidden;

  .balck {
    background-color: #f9f9f9;
  }


  .liveStreamText{
    font-size: 40px;
    font-weight:500;
    color:#BF1B1B;
    text-align:center;
  }
 .liveStreamLogo{
  height:100%;
  width:100%;
 }
 

  .SportsTitleHolder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .LogoHolder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .LogoImage {
    height: 100%;
    width: 100%;
  }

  .LogoOuter {
    height: 100px;
    display: flex;
    align-items: center;
  }

  .LiveOuter {
    height: 100px;
    display: flex;
    align-items: center;
    position: absolute;
    right: -20px;
    top: 10px;
  }

  .CostDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
  }

  .CostDiv2 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    background-color: rgb(0,0,0,0.5);
  }

  .SavingImageHolder {
    height: 100%;
    border-radius: 14px;
  }
  .SavingImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    background-color: black;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .SavingTitle {
    font-size: 40px;
    font-weight: 700;
    color: #1c1f25;
    text-align: right;
    margin-bottom: 0px;
  }
  .SavingTextHolder {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .SavingSubTitle {
    margin-bottom: 5%;
    margin-top: 5px;
    text-align: right;
    font-size: 17.5px;
    color: #1c1f25;
    font-weight: 100;
  }
  .HeroImages {
    display: flex;
    flex-dirextion: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .StarIconGold {
    color: #eea801;
    font-size: 20px;
  }
  .StarIconGrey {
    color: grey;
    font-size: 20px;
  }
  .ReviewCardInner {
    padding-left: 10px;
    padding-top: 10px;
  }

  .ReviewText {
    font-size: 12px;
    color: #3e3e40;
    margin-bottom: 2px;
  }
  .ReviewSubText {
    margin-top: 15px;
    font-size: 14px;
    color: #3e3e40;
    font-weight: 700;
  }

  .CenteringDiv {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .ReviewHolder {
    width: 100%;
    margin-top: 4%;
    margin-bottom: 5%;
    border: 2px;
  }

  .ActionInner {
    padding-left: 5%;
  }
  .ActionHolder {
    width: 100%;
    margin-top: 10%;
    margin-bottom: 10%;
    border: 2px;
    position: relative;
  }

  .ReviewBox {
    width: 100%;
    border-radius: 15px;
    height: 100%;
    padding-bottom: 2%;
    background-color: rgba(185, 70, 78, 0.03);
    border: 1px solid #b9464e19;
  }

  .ReviewTitle {
    font-size: 40px;
    font-weight: 700;
    color: #1c1f25;
    text-align: center;
    margin-bottom: 1px;
  }
  .ReviewSubTitle {
    font-size: 14px;
    font-weight: 100;
    color: grey;
    text-align: center;
    width: 50%;
  }

  .ActionHolderTitleHolder {
    font-size: 40px;
    font-weight: 700;
    color: #1c1f25;
    text-align: left;
    margin-bottom: 1px;
    width: 45%;
  }
  .ActionHolderSubTitleHolder {
    font-size: 30px;
    font-weight: 100;
    color: grey;
    text-align: left;
    width: 50%;
  }

  .ImageBlockHolder {
    margin-top: 6%;
    padding-left: 10%;
    width: 100%;
    height: 100hv;
    
  }
  .ImageBlockHolderSports {
    margin-top: 6%;
    width: 100%;
    height: 100hv;
  }
  .ImageBlockHolder2 {
    margin-top: 6%;
    padding-left: 10%;
    width: 100%;
  }

  .BlockHolder {
    width: 100%;
  }
  .BlockImage1 {
    height: 100%;
    border-radius: 14px;
    width: 100%;
  }
  .Image1Block {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  .BlockImage1Sports {
    position: relative;
  }

  .SubSectionTitle {
    font-size: 40px;
    width: 30%;
    color: #1c1f25;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .SubSectionSubTitleSports {
    font-size: 17.5px;
    width: 100%;
    color: #1c1f25;
    font-weight: 100;
    text-align: center;
  }
  .SubSectionTitleSports {
    font-size: 40px;

    width: 100%;
    color: #1c1f25;
    font-weight: 700;
    margin-bottom: 10px;
    text-align: center;
  }
  .SubSectionSubTitle {
    font-size: 17.5px;
    width: 20%;
    color: #1c1f25;
    font-weight: 100;
  }
  .TitleHolder {
    width: 100%;
    display: flex;
    justify-content: center;
    align-divs: center;
    align-content: center;
    padding-top: 10%;
  }
  .SubTitleHolder {
    width: 100%;
    display: flex;
    justify-content: center;
    align-divs: center;
    align-content: center;
  }

  .MainGriddiv {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .MainGriddivDemo {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    background-color: #d9d9d9;
    position: relative;
    margin-top: 2%;
  }
  .ImageHolder {
    background-color: #1c1f25;
    width: 100%;
    height: 350px;
  }

  .ImageHolder1 {
    width: 100%;
    background-color: #1c1f25;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    height: 100%;
  }
  .Image1 {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  .Image2 {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  .ImageHolder2 {
    background-color: #f9f9f9;
    border-radius: 14px;
    height: 450px;
    margin: 5%;
  }
  .ImageHolder3 {
    background-color: #f9f9f9;
    border-radius: 14px;
    height: 450px;
  }
  .ImageHolder4 {
    background-color: #f9f9f9;
    border-radius: 14px;
    height: 450px;
  }

  .MainTitle {
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1%;
    color: #1c1f25;
  }
  .MainSubTitle {
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    color: #9ea9b8;
    margin-top: 0px;
  }
  .LocalTvText{
    color:#bb434d;
    font-weight:1000;
  }
  .LocalTvImage{
    height:45px;
    width:45px;
  }
  .MainButton {
    height: 40px;
    width: 120px;
    margin: 1.5%;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
  }

  .MainButton:hover {
    background-color: #bb434d;
    cursor: pointer;
  }
  .MainButton:hover .MainButtontext {
    color: white;
  }

  .ActionMainButton {
    height: 50px;
    width: 150px;
    margin: 1.5%;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
  }
  .ActionMainButton:hover {
    cursor: pointer;
    background-color: #bb434d;
  }

  .ActionMainButton:hover .MainButtontext {
    color: white;
  }

  .MainButton,
  .MainButton2,
  .ActionMainButton {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .MainButtontext {
    font-size: 11px;
    color: black;
    font-weight: 500;
    text-align: center;
  }
  .MainButton2 {
    height: 40px;
    width: 120px;
    margin: 1.5%;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    padding-right: 5px;
    padding-left: 5px;
  }
  .Mainbutton2:hover {
    cursor: pointer;
    background-color: #bb434d;
  }

  .MainButton2:hover .MainButtontext2 {
    color: white;
  }

  .MainButtontext2 {
    font-size: 11px;
    font-weight: 100;
    color: #1c1f25;
  }


  .LightEffect {
    border-radius: 150px 0 0 150px; /* The first two values (150px 150px) define the top-left and top-right radii, while the last two (0 0) define the bottom-left and bottom-right radii, making them 0 to create a straight edge */
    opacity: 0.6;
    background: #bb434d;
    filter: blur(100px);
    width: 150px;
    z-index: 1;
    height: 350px;
    position: absolute;
    right: 0px;
    top: 90%;
  }
  .LightEffect2 {
    border-radius: 150px 0 0 150px; /* The first two values (150px 150px) define the top-left and top-right radii, while the last two (0 0) define the bottom-left and bottom-right radii, making them 0 to create a straight edge */
    opacity: 0.800000011920929;
    background: #bb434d;
    filter: blur(100px);
    width: 150px;
    z-index: 1;
    height: 300px;
    position: absolute;
    right: 0px;
    bottom: 100%;
  }

  /* .ActionHolder {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  } */
  @media (min-width: 800px) and (max-width: 950px) {
    .SubSectionTitle {
      width: 50%;
    }
    .BlockImage1Sports {
      width:100%;
    }

    .LiveOuter{
      right:-150px;
      top:-25px;
    }

    .liveStreamText{
      font-size:25px;
      
    }

    .SubSectionSubTitle {
      width: 50%;
    }
    .SavingTitle {
      font-size: 37px;
    }
    .SavingSubTitle {
    }
    .LiveOuter{
      top:25px;
      left:-125px;
    }
  }

  @media (max-width: 767px) {

    .liveStreamLogo{
      height:50%;
      width:50%;
     }
     
    .SavingSubTitle {
      text-align: center;
    }
    .liveStreamText{
      font-size:20px;
      font-weight:1000;
    }
    .LiveOuter{
      top:-40px;
      left:0px;
    }
    .SavingTitle {
      text-align: center;
    }

    .ImageHolder4 {
      display: none;
    }
    .SubSectionTitle {
      width: 75%;
    }
    .SubSectionSubTitle {
      width: 75%;
    }
    .Grid2Images {
      display: none;
    }
    .ImageBlockHolder {
      padding-left: 2%;
    }
  }
`;
export default Hero;
