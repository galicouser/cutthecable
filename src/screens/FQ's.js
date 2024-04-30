import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FrequestlyAskedQuestion from "../components/FrequentlyAskedQuestions";

const Fqs = () => {


  const navigate = useNavigate();
  function GetStartedClicked() {
    navigate("/GetStarted");
  }
  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0.5, translateY: 500 }}
        animate={true ? { opacity: 1, translateY: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className={"TvDisplayMain"}
      >
        <img
          className="TVimage"
          src="https://vizivu.site/wp-content/uploads/2023/05/mockup_a87f50a1-7af3-4f99-bb44-aba6c898788d_1280x-768x259.jpg"
        />

        <p className="TvTitle">
          Experience the ultimate in home entertainment with CatchON TV
        </p>

        <p className="TvSubTitle">
          Get access to amazing domestic and international TV for you to enjoy.
        </p>

        <div className="mainButtonHolder">
          <div className="TvButtonHolder">
            <p className="ButtonText">Download CatchON TV</p>
          </div>

          <div className="TvButtonHolder" onClick={GetStartedClicked}>
            <p className="ButtonText">Get Started Now</p>
          </div>
        </div>

        <hr className="divider" style={{ width: '75%', height: '5px', marginTop: "7.5%", opacity: "1000%", marginBottom: 0, border: 'none' }} />
        <FrequestlyAskedQuestion />

        <div style={{ marginBottom: "5%" }}></div>

      </motion.div>
    </Wrapper>
  )
}

const Wrapper = styled.section`

.TvDisplayMain {
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-top: 10%;
  }
  .TVimage {
    width: 100%;
    margin-top:10%;
  }
  .TvSubTitle {
    text-align: center;
    font-size: 18px;
    margin-top: 0;
    color: #a6a6a6;
    
    font-weight: 100;
  }
  .TvTitle {
    text-align: center;
    font-size: 50px;
    font-weight: 100;
    margin-bottom: 0;
    color: #a6a6a6;
  }

  .mainButtonHolder {
     
    flex-direction: column;
    justify-content: center;
    align-content:center;
    align-items:center;
    width: 100%;
  }
  .TvButtonHolder {
  
    width: 75%;
    margin-top: 10px;
  }
  .ButtonText {
    padding: 0 20px;
    font-size: 15px;
    font-weight: 100;
    color: white;
    text-align:center;
  }
  .divider{
    background: linear-gradient(to top left, #bf3030, white);
  }

  `
export default Fqs;