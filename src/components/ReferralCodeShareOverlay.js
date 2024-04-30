import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { verifyToken } from "../APIs/authAPI";

const ReferralCodeShareOverlay = ({ updateParentValue }) => {
  // const userName = localStorage.getItem("Username");
  const email = localStorage.getItem("Email");
  // const isVerified = localStorage.getItem("isVerified");
  const [token, setToken] = useState()
  function CrossClicked() {
    updateParentValue(false);
  }

  async function VerifyClicked() {
    var user = await verifyToken(email.toString(), token.toString());
    console.log(user);
    if(user.status === 200){
      localStorage.setItem("isVerified", true);
      CrossClicked();
    }
  }

  const handleInputChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <AnimatePresence>
      <Wrapper>
        <motion.div
          className="overlay-backdrop"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="overlay-content">

            <p className="MainTitleOverlay">Please enter the verification tokken that was sent to {email}.</p>


            <div className="InputHolder">

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  onChange={handleInputChange}
                  className="InputField"
                />

              </div>
            </div>


            <Button
              variant="contained"
              onClick={VerifyClicked}
              className="SignUpButton"
              style={{ textTransform: "none" }}
            >
              <p className="SignUpText">Verify</p>

            </Button>

          </div>
        </motion.div>
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled.section`
  .overlay-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.998); /* Semi-transparent backdrop */
  }
  .InputField {
    height: 50px;
    width: 280px;
    margin: 2.5%;
    border-radius: 7px;
  }
  .CopyIcon{
    position:absolute;
    color:grey;
    right:0px;
    top:18px;
    font-size:35px;
}
  

.SignUpButton {
  background-color: #bb434d;
  height: 55px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 5%;
}
.SignUpButton:hover {
  cursor: pointer;
  background-color: transparent;
}
.SignUpText {
  font-size: 15px;
  font-weight: 100;
  color: white;
}
  .overlay-content {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 8px;
    height: 45%;
    width: 27%;
    margin-top: 2.5%;
    padding: 10px;
    overflow: auto;
    border: 1px solid #b9464e19;
    box-shadow: 0 0 0px 1px rgba(185, 70, 78, 0.4);
    background-color: rgba(28, 31, 37, 0.95);
    border-radius: 14px;
  }
 
  .CrossIcon {
    position: absolute;
    right: 15px;
    top: 10px;
    color: white;
    font-size: 40px;
  }
  .CrossIcon:hover {
    cursor: pointer;
  }
  .MainTitleOverlay {
    margin-top: 0px;
    text-align: center;
    font-size: 25px;
    font-weight: 100;
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

  @media (max-width: 767px) {
    .overlay-content {
      width: 80%;
      height: 42%;
      padding: 20px;
      margin-top: 10%;
      padding: 22px;
    }

    .CrossIcon {
      font-size: 35px;
      right: 5px;
    }
  }
  @media (min-width: 800px) and (max-width: 950px) {

    .overlay-content {
      width: 50%;
      height: 30%;
      padding: 20px;
      margin-top: 0%;
      padding: 7%;
    }
  }
`;
export default ReferralCodeShareOverlay;
