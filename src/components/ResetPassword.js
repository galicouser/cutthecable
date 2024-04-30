import React, { useState } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { resetPassword } from "../APIs/authAPI";

const ResetPassword = ({ updateResetParentValue }) => {

  const email = localStorage.getItem("forgotPassEmail");
  const token = localStorage.getItem("forgotPassVerificationToken");
  const [requestingCodeLoader, setRequestingCodeLoader] = useState(false);
  
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");

  const [isValidPass, setisValidPass] = useState(true);
  const [isValidRePass, setisValidRePass] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);

  const handlePassChange = (e) => {
    const inputValue = e.target.value;
    setPass(inputValue);
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(inputValue)) {

      setErrorMessage("")
      setisValidPass(true);
    }
    else {
      setErrorMessage("Password Should have 1 Capital Alphabet,1 Number, 1 special charachter and 8 atleast 8 charachters ")
    }

  };


  const handleRePassChange = (e) => {
    const inputValue = e.target.value;
    setRePass(inputValue);
    if (pass != null && inputValue === pass) {
      setisValidRePass(true);
      setIsVerified(true)
      setErrorMessage("")
    }
    else {
      setErrorMessage("Password dont match")
    }
  };

  async function DoneClicked() {
    try {
      setErrorMessage("")
      setRequestingCodeLoader(true);
      const user = await resetPassword(email, token, pass);
      console.log(user);
      if (user.status === 200) {
        handleButtonClick("functionOne");
      }
      setRequestingCodeLoader(false);



    } catch (error) {
      setRequestingCodeLoader(false);
      setErrorMessage("Token not verified")
      console.log("Error Occured, Please Resend Token and Try Resetting Again!", error);
    }
  }


  const handleButtonClick = (selectedFunction) => {
    updateResetParentValue(selectedFunction);
  };


  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const [showPassword, setShowPassword] = useState(false);

  const [showRepeatPassword, setshowRepeatPassword] = useState(false);

  function toggleRepeatPassword() {
    setshowRepeatPassword(!showRepeatPassword);
  }
  return (
    <Wrapper>
      <p className="SignInTitle">Reset Password</p>
      <p className="TitleText">Please make a password for yourself</p>
      <div className="InputHolder">

        <Grid item container gap={2}>

          <Grid item xs={10}>
            <div className="InputTitle">
              <KeyIcon className="InputTitleIcon" />
              <p className="InputTitleText">Password</p>
            </div>
            <div className="PasswordHolder">
              <input
                className={"ForgotInputFieldGeneral"}
                type={showPassword ? 'text' : 'password'}
                value={pass}
                onChange={handlePassChange}
              />
              {showPassword && <VisibilityIcon className="eyeIconReset" onClick={togglePassword} />}

              {!showPassword && <VisibilityOffIcon className="eyeIconReset" onClick={togglePassword} />}

            </div>
          </Grid>

          <Grid item xs={10}>
            <div className="InputTitle">
              <KeyIcon className="InputTitleIcon" />
              <p className="InputTitleText">Repeat Password</p>
            </div>
            <div className="PasswordHolder">
              <input
                className={"ForgotInputFieldGeneral"}
                type={showRepeatPassword ? 'text' : 'password'}
                value={rePass}
                onChange={handleRePassChange}
              />
              {showRepeatPassword && <VisibilityIcon className="eyeIconReset" onClick={toggleRepeatPassword} />}

              {!showRepeatPassword && <VisibilityOffIcon className="eyeIconReset" onClick={toggleRepeatPassword} />}

            </div>
          </Grid>



        </Grid>
      </div>

      <p className="ErrorMessage">{ErrorMessage}</p>

      <Button
        variant="contained"
        onClick={DoneClicked}
        className="ProceedButton"
        style={{ textTransform: "none" }}
        disabled={!isVerified}
      >
        {!requestingCodeLoader &&
                   <p className="SignUpText">Done</p>
                }
                {requestingCodeLoader &&
                  <CircularProgress size={25} style={{ color: "white"}}/>
                }
      </Button>

    </Wrapper>
  );
};
const Wrapper = styled.section`

  width:100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5%;


  .ForgotInputFieldGeneral{
    outline: none;
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
  .ErrorMessage {
    font-size: 18px;
    font-weight: 500;
    color: red;
  }
  .eyeIconReset{
    position:absolute;
    right:10px;
    top:7px;
    font-size:30px;
    color:grey;
  }
  .PasswordHolder{
    position:relative;
  }
  .SignInTitle{
    font-size:35px;
    color:white;
    font-weight:700;
    margin-top:0px;
  
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
    align-divs: center;
    border-radius: 5px;
    margin-top: 5%;
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
    align-divs: center;
    border-radius: 5px;
    margin-top: 2.5%;
  }
  .ProceedButton:hover {
   cursor:pointer;
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

  @media (max-width: 767px) {
    overflow-y: auto;
    margin-top: 10%;
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
    .ForgotInputFieldGeneral {
      width: 100%;
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
export default ResetPassword;
