import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { signupUser } from "../APIs/authAPI";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from "@mui/material/CircularProgress";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
// import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import {jwtDecode} from "jwt-decode";


const SignInGeneralDeatils = ({ updateSubParentValue }) => {
  const [email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [RepeatPassword, setRepeatPassword] = useState("");
  const [takePass, setTakePass] = useState(false);

  const [isValidEmail, setisValidEmail] = useState(false);




  //

  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential);
    const { name, sub, picture, email, given_name } = userObject;
    console.log(userObject)
    setEmail(email);
    setUserName(given_name);
    setUserPicture(picture);
    setTakePass(true);
  }

  //

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    var Check = /^.+@.+\.[A-Za-z]{2,}$/.test(inputValue);
    if (Check) {
      setisValidEmail(true);
      setEmail(inputValue);
      setErrorMessage("");
    }
    else {
      setisValidEmail(false);
      setErrorMessage("Invalid Email")

    }

  };

  const [isUserameValid, setisUserameValid] = useState(false);

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;
    setUserName(inputValue);
    var Check = /^(?=.*[a-zA-Z])(?=.*[0-9]).*$/.test(inputValue);
    if (Check) {
      setisUserameValid(true);
      setErrorMessage("");
    }
    else {

      setisUserameValid(false);
      setErrorMessage("Username should have atleast 1 Alphabet and 1 Number")
    }

  };

  const [isPasswordValid, setisPasswordValid] = useState(false);

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    var Check = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(inputValue);
    if (Check) {

      setisPasswordValid(true);
      setErrorMessage("");
    }
    else {
      setisPasswordValid(false);
      setErrorMessage("Password, 1 Capital, 1 small, 1 special char and needs to be atleast 8 chars")
    }

  };

  const [isRepeatPasswordValid, setisRepeatPasswordValid] = useState(false);

  const handleRepeatPasswordChange = (e) => {
    const inputValue = e.target.value;
    setRepeatPassword(inputValue);

    if (inputValue === Password) {
      setisRepeatPasswordValid(true);
      setErrorMessage("")
    } else {
      setisRepeatPasswordValid(false);
      setErrorMessage("Password Dont Match")
    }
  };

  const [ProceedLoading, setProceedLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  async function ProceedClicked() {
    if (isValidEmail && isUserameValid && isPasswordValid && isRepeatPasswordValid) {
      try {
        setProceedLoading(true);
        const user = await signupUser(email, Password, UserName, 'https://cdn.pixabay.com/photo/2022/04/13/12/14/man-7130170_1280.jpg');
        console.log(userPicture)
        setProceedLoading(false);
        console.log(user);
        handleButtonClick("functionOne");
      } catch (error) {
        console.log("Error signing up:", error);
        setErrorMessage("Error signing up");
      }
    } else if (takePass && isPasswordValid && isRepeatPasswordValid) {
      try {
        setProceedLoading(true);
        const user = await signupUser(email, Password, UserName, 'https://cdn.pixabay.com/photo/2022/04/13/12/14/man-7130170_1280.jpg');
        setProceedLoading(false);
        console.log(user);
        handleButtonClick("functionOne");
      } catch (error) {
        console.log("Error signing up:", error);
        setErrorMessage("Error signing up");
      }
    } else {

      setErrorMessage(
        "Invalid Fields Filled," +
        (isValidEmail ? "" : " Email") +
        (isUserameValid ? "" : " Username") +
        (isPasswordValid ? "" : " Password") +
        (isRepeatPasswordValid ? "" : " Repeat Password")
      );
    }
  }

  const handleButtonClick = (selectedFunction) => {
    updateSubParentValue(selectedFunction);
  };


  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);

  function toggleRepeatPassword() {
    setshowRepeatPassword(!showRepeatPassword);
  }
  const responseFacebook = (response) => {
    console.log(response);
    const email = response.email;
    const name = response.name;
    setTakePass(true);

  }
  // const authHandler = (err, data) => {
  //   console.log(err, data);
  //   const email = data.profileObj.email;
  //   const name = data.profileObj.name;
  //   console.log(email)
  //   setTakePass(true);
  // };


  // useGoogleOneTapLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });


  // //google auth start
  // function handlecallbackresponse(response){

  // }
  // useEffect(() =>{
  //   GoogleOAuthProvider.accounts.id.initialize({
  //   client_id: "282250982997-oq8rjm50mp82je5i8nd3o17dc77fs6fl.apps.googleusercontent.com",
  //   callback: handlecallbackresponse
  // });
  // GoogleOAuthProvider.accounts.id.renderButton(
  //   document.getElementsByClassName("google_auth"),
  //   {theme:"outline",size:"large"}
  // );
  // }, []);
  // //google auth end

  return (
    <Wrapper>
      <div className="InputHolder">
        {!takePass &&
          <Grid item container gap={2}>
            <Grid item sm={7} xs={11.5}>
              <div className="InputTitle">
                <EmailIcon className="InputTitleIcon" />
                <p className="InputTitleText">Email</p>
              </div>
              <input
                className={"InputFieldGeneral"}
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item sm={4} xs={11.5}>
              <div>
                <div className="InputTitle">
                  <PersonIcon className="InputTitleIcon" />
                  <p className="InputTitleText">Username</p>
                </div>
                <input
                  className={"InputFieldGeneral"}
                  type="text"
                  value={UserName}
                  onChange={handleUsernameChange}
                />
              </div>
            </Grid>
            <Grid item sm={5.5} xs={11.5}>

              <div className="InputTitle">
                <KeyIcon className="InputTitleIcon" />
                <p className="InputTitleText">Password</p>
              </div>
              <div className="PasswordInputHolder">
                <input
                  className="InputFieldGeneral"
                  value={Password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handlePasswordChange}
                />
                {showPassword && <VisibilityIcon className="eyeIcon" onClick={togglePassword} />}

                {!showPassword && <VisibilityOffIcon className="eyeIcon" onClick={togglePassword} />}

              </div>
            </Grid>
            <Grid item sm={5.5} xs={11.5}>
              <div>
                <div className="InputTitle">
                  <KeyIcon className="InputTitleIcon" />
                  <p className="InputTitleText">Repeat Password</p>
                </div>
                <div className="PasswordInputHolder">
                  <input
                    className="InputFieldGeneral"
                    value={RepeatPassword}
                    type={showRepeatPassword ? 'text' : 'password'}
                    onChange={handleRepeatPasswordChange}
                  />
                  {showRepeatPassword && <VisibilityIcon className="eyeIcon" onClick={toggleRepeatPassword} />}

                  {!showRepeatPassword && <VisibilityOffIcon className="eyeIcon" onClick={toggleRepeatPassword} />}

                </div>
              </div>
            </Grid>
            <GoogleOAuthProvider clientId="815904026808-i4tr0238qthdjqke88ljc1icg5v3fcjb.apps.googleusercontent.com">
              <div>
                <div className="social">OR</div>
                <div className="social_auth">

                  <GoogleLogin
                    size="large"
                    shape="pill"
                    width={'300px'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy="single_host_origin"
                  />


                  {/* <FacebookLogin
                    appId="2066611500347015"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon={<FacebookIcon style={{marginLeft: '20px'}}/>} // Use FontAwesomeIcon component
                    textButton="Login with Facebook" // Change this text as needed
                    cssClass="fb_auth"
                  /> */}



                  {/* <TwitterLogin
              authCallback={authHandler}
              consumerKey="FKNbP8GUQ7uVNx7r4nao5GeHq"
              consumerSecret="QpYCZOm1d1pxb2KUIRwmaBrB9x2dnXNv7LTu6HqcEHupSYDKCw"
              /> */}




                </div>
              </div>
            </GoogleOAuthProvider>
          </Grid>
        }
        {takePass &&
          <Grid item container gap={2}>
            <Grid item sm={5.5} xs={11.5}>

              <div className="InputTitle">
                <KeyIcon className="InputTitleIcon" />
                <p className="InputTitleText">Password</p>
              </div>
              <div className="PasswordInputHolder">
                <input
                  className="InputFieldGeneral"
                  value={Password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handlePasswordChange}
                />
                {showPassword && <VisibilityIcon className="eyeIcon" onClick={togglePassword} />}

                {!showPassword && <VisibilityOffIcon className="eyeIcon" onClick={togglePassword} />}

              </div>
            </Grid>
            <Grid item sm={5.5} xs={11.5}>
              <div>
                <div className="InputTitle">
                  <KeyIcon className="InputTitleIcon" />
                  <p className="InputTitleText">Repeat Password</p>
                </div>
                <div className="PasswordInputHolder">
                  <input
                    className="InputFieldGeneral"
                    value={RepeatPassword}
                    type={showRepeatPassword ? 'text' : 'password'}
                    onChange={handleRepeatPasswordChange}
                  />
                  {showRepeatPassword && <VisibilityIcon className="eyeIcon" onClick={toggleRepeatPassword} />}

                  {!showRepeatPassword && <VisibilityOffIcon className="eyeIcon" onClick={toggleRepeatPassword} />}

                </div>
              </div>
            </Grid>
          </Grid>
        }
      </div>

      <p className="ErrorMessage">{ErrorMessage}</p>

      {takePass &&
        <Button
          variant="contained"
          onClick={() => {
            setTakePass(false);
          }}
          className="SignUpButton"
          style={{ textTransform: "none" }}
        >
          <>
            <p className="SignUpText"> Go Back</p>
          </>
        </Button>
      }

      <Button
        variant="contained"
        onClick={ProceedClicked}
        className="SignUpButton"
        style={{ textTransform: "none", marginBottom: '50px' }}
      >
        {!ProceedLoading && (
          <>
            <p className="SignUpText">Proceed</p>
          </>
        )}

        {ProceedLoading && (
          <>
            <CircularProgress size={25} style={{ color: "white" }} />
          </>
        )}
      </Button>

    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding-left: 5%;
  overflow-x:hidden;
  overflow-y:auto;

    .fb_auth {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    background-color: #1877F2;
    color: white;
    font-size: 15px;
    padding-right: 50px;
  }

  .fb_auth i {
    font-size: 20px;
    margin-right: 10px; /* Adjust as needed */
  }


  .social{
    color: white;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }

  .social_auth{
    width: 100%;
    height: 120px;
    display: grid;
    justify-content: center;
    padding: 2%;
  }

  .google-auth{
    border-radius: 10px;
    height: 500px;

  }

  .ErrorMessage {
    font-size: 18px;
    font-weight: 500;
    color: red;
  }
  .PasswordInputHolder{
    position:relative;
  }
  .eyeIcon{
    position:absolute;
    right:10px;
    top:7px;
    font-size:30px;
    color:grey;
  }
  .MainTitleOverlay {
    margin-top: 0px;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: white;
    margin-bottom: 0;
  }

  .SignUpButton {
    background-color: #bb434d;
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5%;
    margin-bottom:2%;
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

  .InputFieldGeneral {
    width: 100%;
    height: 40px;
    margin-top: 0;
    border-radius: 5px;
    font-size:18px;
  }

  @media (max-width: 767px) {
    padding-left: 1.5%;
    overflow-y:auto;
    .overlay-content {
      width: 80%;
      height: 77.5%;
      padding: 20px;
      margin-top: 10%;
      padding: 22px;
    }
    .SignUpButton {
      background-color: #bb434d;
      width: 200px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      border-radius: 5px;
      margin-top: 10%;
      margin-bottom:2%;
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
    .InputFieldGeneral {
      width: 400px;
      height: 500px;
      margin-top: 0;
      background-color: white;
      padding: 1%;
    }
    .CrossIcon {
      font-size: 35px;
      right: 5px;
    }
    .InputHolder {
      margin-top: 0%;
    }
    .InputTitleText {
      font-size: 15px;
    }
    .InputTitleIcon {
      font-size: 25px;
    }
    .InputFieldGeneral {
      height: 30px;
      width: 100%;
    }
  }
`;
export default SignInGeneralDeatils;
