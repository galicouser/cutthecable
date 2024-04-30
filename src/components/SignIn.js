import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import ForgotPasswordEmailInput from "./ForgotPasswordEmailInput";
import ResetPassword from "./ResetPassword";
import ResetPasswordFinished from "./ResetPasswordDone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../APIs/authAPI";

const SignIn = ({ updateSignInParentValue }) => {
  const [GeneralSignIn, setGeneralSignIn] = useState(true);
  const [ForgotPasswordDone, setForgotPasswordDone] = useState(false);
  const [ResetPasswordDone, setResetPasswordDone] = useState(false);
  const [ResetPasswordCompleted, setResetPasswordCompleted] = useState(false);
  const [Adminclicked, setAdminclicked] = useState(false);
  const [Userclicked, setUserclicked] = useState(true);
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [SignInAwait, setSignInAwait] = useState(false);
  const [toggleValue, settoggleValue] = useState(true);
  function ToggleButtonEvent() {
    settoggleValue(!toggleValue);
  }

  const navigate = useNavigate();

  async function SignUpClicked() {
    var localToggle = false;
    if (UserName == 'Admin' || UserName == 'admin') {
      settoggleValue(false);
      localToggle = false;
    }
    else {
      settoggleValue(true);
      localToggle = true;
    }

    if (Password && UserName) {
      try {
        setSignInAwait(true);
        const user = await loginUser(UserName, Password);
        console.log(user)
        setErrorMessage("");
        setSignInAwait(false);
        if (user) {
          localStorage.setItem("Username", user.userName);
          localStorage.setItem("Email", user.email);
          localStorage.setItem("isVerified", user.verified);
          localStorage.setItem("ProfilePicture", user.profile_picture);
        } else {
          localStorage.setItem("Username", null);
          localStorage.setItem("Email", null);
          localStorage.setItem("isVerified", null);
        }
        console.log(user);
        if (localToggle) {
          localStorage.setItem("UserType", 'user');
          updateSignInParentValue("functionOne");
        }
        else {
          localStorage.setItem("UserType", 'admin');
          updateSignInParentValue("functionThree");
        }
      } catch (error) {
        console.log("Error signing in:", error);
        setErrorMessage("Incorrect Password/Username");
        setSignInAwait(false);
      }
    } else {
      console.log("Username or Password is not correct, TRY AGAIN!");
      setErrorMessage("Invalid Username or Password");
    }
  }

  function CrossClicked() {
    updateSignInParentValue("functionTwo");
  }

  function ForgotPasswordClicked() {
    setForgotPasswordDone(!ForgotPasswordDone);
    setGeneralSignIn(false);
  }
  function DoneClicked() {
    setForgotPasswordDone(false);
    setGeneralSignIn(false);
    setResetPasswordDone(true);
  }

  const updateForgotParentValue = (selectedFunction) => {
    if (selectedFunction === "functionOne") {
      DoneClicked();
    } else if (selectedFunction === "functionTwo") {
    }
  };

  const updateResetParentValue = (selectedFunction) => {
    if (selectedFunction === "functionOne") {
      setResetPasswordDone(false);
      setResetPasswordCompleted(true);
    } else if (selectedFunction === "functionTwo") {
    }
  };

  const updateResetDoneParentValue = (selectedFunction) => {
    if (selectedFunction === "functionOne") {
      setResetPasswordCompleted(false);
      setGeneralSignIn(true);
    } else if (selectedFunction === "functionTwo") {
    }
  };

  function BackClicked() {
    if (ForgotPasswordDone) {
      setForgotPasswordDone(false);
      setGeneralSignIn(true);
      setResetPasswordDone(false);
    } else if (ResetPasswordDone) {
      setForgotPasswordDone(true);
      setGeneralSignIn(false);
      setResetPasswordDone(false);
    }
  }

  const [isUserameValid, setisUserameValid] = useState(true);
  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;
    setUserName(inputValue);
    setisUserameValid(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/.test(inputValue));
    if (inputValue == 'Admin' || inputValue == 'admin') {
      settoggleValue(false);
    }
    else {
      settoggleValue(true);
    }
  };

  const [isPasswordValid, setisPasswordValid] = useState(true);
  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    setisPasswordValid(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        inputValue
      )
    );
  };

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const [showPassword, setShowPassword] = useState(false);
  return (
    <AnimatePresence>
      <Wrapper>
        <motion.div
          className="overlay-backdrop"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div
            className={
              !ResetPasswordCompleted ? "overlay-content" : "overlay-content2"
            }
          >
            {!ResetPasswordCompleted && (
              <>
                <CloseIcon className="CrossIcon" onClick={CrossClicked} />
                {!GeneralSignIn && (
                  <ArrowBackIcon className="BackIcon" onClick={BackClicked} />
                )}
              </>
            )}

            {GeneralSignIn && (
              <div className="MainHolder">

                <Grid item container gap={2} className="CenteringDiv">
                  <div className="InputGrid">
                    <p className="MainTitleOverlay">Welcome</p>
                    <p className="CurrentUserText"> {toggleValue ? "User" : "Admin"} </p>

                    <div className="ToggleButton" onClick={ToggleButtonEvent}>
                      <motion.div className="Toggle"
                        animate={toggleValue ? { left: "2%" } : { left: "65%" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                      </motion.div>
                    </div>

                    <Grid item sm={10}>
                      <div className="InputTitle">
                        <PersonIcon className="InputTitleIcon" />
                        <p className="InputTitleText">Username</p>
                      </div>
                      <Grid item xs={10}>
                        <input
                          className="InputField"
                          value={UserName}
                          onChange={handleUsernameChange}
                        />
                      </Grid>
                    </Grid>

                    <Grid item sm={10}>
                      <div className="InputTitle">
                        <PersonIcon className="InputTitleIcon" />
                        <p className="InputTitleText">Password</p>
                      </div>
                      <Grid item xs={10}>
                        <div className="InputFieldWithEye">
                          <input
                            className="InputField"
                            value={Password}
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange}
                          />
                          {showPassword && (
                            <VisibilityIcon
                              className="eyeIcon"
                              onClick={togglePassword}
                            />
                          )}

                          {!showPassword && (
                            <VisibilityOffIcon
                              className="eyeIcon"
                              onClick={togglePassword}
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                {/* //////////////////////////////////////// */}
                <p
                  className="ForgotPasswordText"
                  onClick={ForgotPasswordClicked}
                >
                  Forgot Password ?
                </p>

                <p className="ErrorMessage">{ErrorMessage}</p>

                <Button
                  variant="contained"
                  onClick={SignUpClicked}
                  className="SignUpButton"
                  style={{ textTransform: "none" }}
                >
                  {!SignInAwait && (
                    <>
                      <p className="SignUpText">Sign In</p>
                    </>
                  )}

                  {SignInAwait && (
                    <>
                      <CircularProgress size={25} style={{ color: "white" }} />
                    </>
                  )}
                </Button>
              </div>
            )}

            {ForgotPasswordDone && (
              <ForgotPasswordEmailInput
                updateForgotParentValue={updateForgotParentValue}
              />
            )}
            {ResetPasswordDone && (
              <ResetPassword updateResetParentValue={updateResetParentValue} />
            )}

            {ResetPasswordCompleted && (
              <ResetPasswordFinished
                updateResetDoneParentValue={updateResetDoneParentValue}
              />
            )}
          </div>
        </motion.div>
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled.section`
  .MainHolder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    overflow-x: auto;
    height:100%;
    width:100%;
  }
  .InputFieldWithEye{
    position:relative;
    width:100%;
  }
  .InputGrid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .ErrorMessage {
    font-size: 18px;
    font-weight: 500;
    color: red;
  }
  .InputHolder {
    position: relative;
  }
  .eyeIcon {
    position: absolute;
    right: -30px;
    top:17px;
    font-size: 30px;
    color: grey;
  }
  .overlay-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent backdrop */
    z-index: 2;
  }
  .ForgotPasswordText {
    color: white;
    font-size: 15px;
    font-weight: 100;
    padding-left: 1%;
  }
  .ForgotPasswordText:hover {
    cursor: pointer;
  }
  .InputField {
    height: 50px;
    margin: 2.5%;
    border-radius: 7px;
    font-size: 18px;
  }
  .RadioText {
    font-size: 15px;
    font-weight: 100;
    padding: 7px;
    color: white;
  }
  .RadioText2 {
    font-weight: 100;
    padding-right: 5px;
    padding: 7px;
    color: white;
    font-size: 15px;
  }
  .RadioText2:hover {
    cursor: pointer;
  }
  .RadioText:hover {
    cursor: pointer;
  }

  .RadioButton {
    background-color: #bb434d;
    height: 25px;
    width: 150px;
    border-radius: 12.5px;
    display: flex;
    justify-content: space-between;
    margin-top: 5%;
    align-items: center;
    position: relative;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 2);
    position: relative;
  }
  .InputField:focus {
    outline: none;
  }
  .SliderButton {
    position: absolute;
    height: 21px;
    width: 70px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 2);
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
    justify-content: center;
    align-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1d0e47;
    padding: 20px;
    border-radius: 8px;
    height: 65%;
    width: 30%;
    margin-top: 2.5%;
    padding: 10px;
    border: 1px solid #b9464e19;
    box-shadow: 0 0 0px 1px rgba(185, 70, 78, 0.4);
    background-color: rgba(28, 31, 37, 0.95);
    border-radius: 14px;
  }
  .overlay-content2 {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1d0e47;
    padding: 20px;
    border-radius: 8px;
    height: 65%;
    width: 30%;
    margin-top: 2.5%;
    padding: 10px;
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

  .BackIcon {
    position: absolute;
    left: 5%;
    top: 15px;
    color: white;
    font-size: 30px;
  }
  .BackIcon:hover {
    cursor: pointer;
  }

  .MainTitleOverlay {
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: white;
    margin-top: 70px;
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
  .ToggleButton{
    width:65px;
    display: flex;
    justify-content: center;
    align-items: center;
    height:60px;
    background-color: white;
    position: relative;
    border-radius: 15px;
  }
  .Toggle{
    height:20px;
    width: 20px;
    background-color: black;
    opacity: 0.8;
    position:absolute;
    border-radius: 50%;
  }
  .CurrentUserText{
    margin-bottom: 7px;
    margin-top: 0;
    color: white;
    transition: all 1s;
  }

  @media (max-width: 767px) {
    position: absolute;
    z-index: 20;
    display: grid;
    place-content: center;
    .InputGrid {

      width: 70%;
    }
    .ToggleButton{

    height:25px;
  }
    .MainTitleOverlay {
      margin-top: 30%;
      text-align: center;
      font-size: 25px;
      font-weight: 700;
      color: white;
      margin-bottom: 0%;
    }

    .overlay-content {
      width: 80%;
      height: 70%;
      padding: 10px;
    }
    .overlay-content2 {
      width: 80%;
      height: 60%;
      padding: 10px;
    }

    .CrossIcon {
      font-size: 35px;
      right: 5px;
    }
  }
  @media (min-width: 800px) and (max-width: 950px) {
    .overlay-content {
      width: 60%;
      height: 50%;
    }
    .overlay-content2 {
      width: 60%;
      height: 50%;
    }
  }

  @media (min-width: px) and (max-width: 950px) {


   }
`;
export default SignIn;
