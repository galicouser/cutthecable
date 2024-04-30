import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import styled from "styled-components";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import { initiateResetPassword, verifyToken } from "../APIs/authAPI";

const ForgotPasswordEmailInput = ({ updateForgotParentValue }) => {


  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isValidEmail, setisValidEmail] = useState(true);
  //Circular Loader States 
  const [requestingCodeLoader, setRequestingCodeLoader] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);


  const handleEmailChange = (e) => {
   

    const inputValue = e.target.value;
    setEmail(inputValue);
    var Check = /^.+@.+\.[A-Za-z]{2,}$/.test(inputValue);
    if(Check){
      setisValidEmail(true);
      setEmail(inputValue);
      setErrorMessage("");
    }
    else {
      setisValidEmail(false);
      setErrorMessage("Invalid Email")

    }
  };


  const handleTokenChange = (e) => {
    const inputValue = e.target.value;
    setToken(inputValue);
    if (verifyEmail) {
      localStorage.setItem("forgotPassVerificationToken", inputValue);
      localStorage.setItem("forgotPassEmail", email);
      //setIsVerified(true);
    }
  };


  function DoneClicked() {
    handleButtonClick("functionOne");
  }

  async function RequestToken() {
    if (email) {
      try {
        setRequestingCodeLoader(true);
        const user = await initiateResetPassword(email);
        if (user.status) {
          setVerifyEmail(true);
          console.log(user);
        }
        setRequestingCodeLoader(false);
      } catch (error) {
        // Handle the error appropriately, e.g., display an error message.
        setRequestingCodeLoader(false);
        setVerifyEmail(false);
        console.log("Error sending password change request, try again!:", error);
      }
    }
    else {
      setErrorMessage("Please Provide Email!");
      console.log("Please Provide Email!")
    }
  }


  async function VerifyToken() {
    if (email && token) {
      try {
        setVerificationLoading(true);
        var user = await verifyToken(email.toString(), token.toString());
        setVerificationLoading(false);
        setIsVerified(true);
        console.log(user);
        handleButtonClick("functionTwo");
      } catch (error) {
        setVerificationLoading(false);
        console.log("Error sending password change request, try again!:", error);
      }
    }
    else {
      setErrorMessage("Please Provide Email!");
      console.log("Please Provide Email!")
    }
  }

  const handleButtonClick = (selectedFunction) => {
    updateForgotParentValue(selectedFunction);
  };


  return (
    <Wrapper>
      <p className="SignInTitle">Email Verification</p>
      <div className="InputHolder">

        <p className="TitleText">Provide your registered E-Mail and press Request Code button, from E-Mail you get copy and paste code here.</p>
        <Grid item container gap={2}>

          <Grid item sm={10}>
            <div className="InputTitle">
              <EmailIcon className="InputTitleIcon" />
              <p className="InputTitleText">Registered Email</p>
            </div>
            <Grid item xs={10}>
              <input
                className={"ForgotInputFieldGeneral"}
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={RequestToken} className="SignUpButton" style={{ textTransform: "none" }}>
                {!requestingCodeLoader &&
                  <p className="SignUpText">Request Code</p>
                }
                {requestingCodeLoader &&
                  <CircularProgress size={25} style={{ color: "white" }} />
                }
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <div className="InputTitle">
              <KeyIcon className="InputTitleIcon" />
              <div>
                <p className="InputTitleText">Vertification Token{verifyEmail && <>(Please Check Your Inbox)</>}</p>
              </div>
            </div>
            <input
              className={"ForgotInputFieldGeneral"}
              type="text"
              value={token}
              onChange={handleTokenChange}
            />
          </Grid>



        </Grid>
      </div>
      <p className="ErrorMessage">{ErrorMessage}</p>
      <div className="ButtonHolder">

        <Button
          variant="contained"
          onClick={VerifyToken}
          className="SignUpButton"
          style={{ textTransform: "none" }}
          disabled={!verifyEmail}
        >


          {!verificationLoading &&
            <p className="SignUpText">Verify</p>
          }
          {verificationLoading &&
            <CircularProgress size={25} style={{ color: "white",fontSize:10}} />
          }
        </Button>
        

        <Button
          variant="contained"
          onClick={DoneClicked}
          className="ProceedButton"
          style={{ textTransform: "none" }}
          disabled={!isVerified}
        >
          <p className="SignUpText">Done</p>
        </Button>

      </div>

    </Wrapper>
  );
};
const Wrapper = styled.section`
width:100%;
overflow-y: auto;
overflow-x: auto;
margin-top: 10%;
.ErrorMessage{
  text-align:center;
  font-size:18px;
  font-weight:500;
  color:red;
  margin:2.5%;
}

.SignInTitle{
    font-size:35px;
    color:white;
    font-weight:700;
    margin-top:0px;
    position: relative;
  }
  .OTPInput{
    background-color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    align-content:center;
    height:35px;
    width:100%;
    border-radius:9px;
    margin:5%;
    text-align:center;
    
  }
  .TitleText{
    margin-top:0px;
    margin-bottom:10px;
    color:white;
  }
  .ButtonHolder{
    display:flex;
  }

  .SignUpButton {
    background-color: #BB434D;
    width: 200px;
    height:55px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-content: center;
    border-radius: 5px;
    margin-top: 4%;
  }
  .SignUpButton:hover {
   cursor:pointer;
}

.ProceedButton {
  background-color: #BB434D;
  width: 200px;
  height:55px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-content: center;
  border-radius: 5px;
  margin-top: 4%;
  margin-left: 2.5%;
  }
  .ProceedButton:hover {
   cursor:pointer;
   background-color:transparent;
}
  .SignUpText {
    font-size: 15px;
    font-weight: 100;
    color: white;
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
 
  .ForgotInputFieldGeneral {
    width: 100%;
    height:40px;
    margin-top: 0;
    border-radius:5px;
    font-size:18px;
  }
  .ForgotInputFieldGeneral:focus {
    outline: none;
  }

  @media (max-width: 767px) {
    margin-top: 15%;
    .ButtonHolder{
      display:flex;
      padding: 0.2rem;
    }
   
    .ForgotInputFieldGeneral {
      width: 90%;
      height: px;
      margin-top: 0;
      background-color:white;

    }
    .CrossIcon {
      font-size: 35px;
      right: 5px;
    }
    .InputHolder {
      margin-top: 10%;
    }
    .InputTitleText {
      font-size: 15px;
    }
    .InputTitleIcon {
      font-size: 25px;
    }
  }
  `;
export default ForgotPasswordEmailInput;
