import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const CardDetails = ({ updateSubCrdParentValue }) => {
  function SignUpClicked() {
    updateSubCrdParentValue(false);
  }

  return (
    <Wrapper>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          className="CenteringDiv"
        >
          <p className="MainTitleOverlay">Card here.</p>
          <p className="SubTitle2Overlay">
            After you sign up with the form below, you will receive an email
            with activation instructions. Please read carefully. Contact us if
            you need any assistance.
          </p>
          <div className="InputHolder">
            <div className="InputTitle">
              <CreditCardIcon className="InputTitleIcon" />
              <p className="InputTitleText">Card Number</p>
            </div>

            <input className="InputField" />
            <div className="InputTitle">
              <PersonIcon className="InputTitleIcon" />
              <p className="InputTitleText">Name on Card</p>
            </div>

            <input className="InputField" />

            <div className="InputTitle">
              <FlagIcon className="InputTitleIcon" />
              <p className="InputTitleText">Expiry</p>
            </div>

            <input className="InputField" />
            <div className="InputTitle">
              <FlagIcon className="InputTitleIcon" />
              <p className="InputTitleText">CVV</p>
            </div>

            <input className="InputField" />
          </div>

          <div>
            <div className="SignUpButton" onClick={SignUpClicked}>
              <p className="SignUpText">Pay Now</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Wrapper>
  );
};
const Wrapper = styled.section`

display: flex;
flex-direction:column;
align-content: center;
align-items: center;

.CenteringDiv{
    display: flex;
flex-direction:column;
align-content: center;
align-items: center;
}
.MainTitleOverlay {
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: white;
    margin-bottom: 0;
  }
  .SubTitleOverlay {
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    color: white;
    margin-bottom: 0;
  }
  .SubTitle2Overlay {
    text-align: center;
    font-size: 13px;
    font-weight: 300;
    width: 85%;
    color: white;
    margin-bottom: 0;
  }

  .InputTitle {
    display: flex;
    align-content: center;
    align-items: center;
    margin-bottom: 0;
    width: 300px;
  }
  .InputTitleIcon {
    color: white;
    font-size: 15px;
  }
  .InputTitleText {
    color: white;
    margin-left: 5px;
    font-size: 13px;
    
  }
  .InputHolder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .SignUpButton {
    background-color: white;
    width: 200px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5%;
  }
  .SignUpButton:hover {
   cursor:pointer;
}
  .SignUpText {
    font-size: 15px;
    font-weight: bold;
    color: #1D0E47;
  }

  @media (max-width: 767px) {
    .overlay-content {
      width: 80%;
      height: 77.5%;
      padding: 20px;
      margin-top: 10%;
      padding: 22px;
    }
    .MainTitleOverlay {
      font-size: 25px;
    }
    .SubTitleOverlay {
      font-size: 20px;
    }
    .SubTitle2Overlay {
      font-size: 15px;
    }
    .InputField {
      width: 280px;
      height: 50px;
      margin-top: 0;
    }
    .CrossIcon {
      font-size: 35px;
      right: 5px;
    }
    .InputHolder {
    }
    .InputTitleText {
      font-size: 15px;
      text-align:center;
    }
    .InputTitleIcon {
      font-size: 25px;
    }
  `;
export default CardDetails;
