import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/authSlice";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { signupUser, googleAuth } from "../APIs/authAPI";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from "@mui/material/CircularProgress";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
// import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import {jwtDecode} from "jwt-decode";

import './css/ChoosePlan.css';


const SignInGeneralDeatils = ({ updateSubParentValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, username: value }));

    if (value.length < 6) {
      setErrors((prev) => ({ ...prev, username: 'Username must be at least 6 characters'}));
    } else {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address'}));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));

    const minLength = value.length >= 7;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (!minLength || !hasUppercase || !hasLowercase || !hasNumber) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 7 characters and include uppercase, lowercase, and a number.'
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: ''}));
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, confirmPassword: value }));

    if (value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (username.trim().length < 6) {
      newErrors.username = 'Username must be atleast 6 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const minLength = password.length >= 7;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!minLength || !hasUppercase || !hasLowercase || !hasNumber) {
      newErrors.password = 'Password must be atleast 6 characters and include uppercase, lowercase, and a number.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(newErrors);

    const hasAnyErrors = Object.values(newErrors).some((err) => err !== '');
    console.log('HasAnyErrors ' + hasAnyErrors)
    if (hasAnyErrors) {
      console.warn('Invalid fields');
      return;
    }

    try {
      setLoading(true);
      const user = await signupUser(email, password, username, 'https://cdn.pixabay.com/photo/2022/04/13/12/14/man-7130170_1280.jpg');
      setLoading(false);
      updateSubParentValue("functionOne");
    } catch (error) {
      setLoading(false);
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Error signing up. Please try again'
      }))
    }
  };

  const handleGoogleSignUp = async (credentials) => {

    try {
      setLoading(true);
      const response = await googleAuth(credentials);
      setLoading(false);

      if (response.isNewUser) {
        updateSubParentValue("functionOne");
      } else {
        dispatch(setUser(response.user));
        updateSubParentValue("functionTwo");
        navigate("/");
      }

    } catch (error) {
      setLoading(false);
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Error signing up. Please try again'
      }))
    }

  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Wrapper>
      <div className="InputHolder">
          <Grid item container gap={2}>
            <Grid item sm={7} xs={11.5}>
              <div className="InputTitle">
                <EmailIcon className="InputTitleIcon" />
                <p className="InputTitleText">Email</p>
              </div>
              <input
                className={"InputFieldGeneral"}
                type="text"
                value={formData.email}
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
                  value={formData.username}
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
                  value={formData.password}
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
                  <p className="InputTitleText">Confirm Password</p>
                </div>
                <div className="PasswordInputHolder">
                  <input
                    className="InputFieldGeneral"
                    value={formData.confirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={handleConfirmPassword}
                  />
                  {showConfirmPassword && <VisibilityIcon className="eyeIcon" onClick={toggleConfirmPassword} />}

                  {!showConfirmPassword && <VisibilityOffIcon className="eyeIcon" onClick={toggleConfirmPassword} />}

                </div>
              </div>
            </Grid>
            <p className="ErrorMessage">{errors.confirmPassword}</p>
            <Grid item sm={5.5} xs={11.5} className="google-login">
              <div>
                <h4 className="or-text">OR</h4>
                <GoogleLogin
                  onSuccess={handleGoogleSignUp} />
              </div>
            </Grid>
          </Grid>
        </div>


      <Button
        variant="contained"
        onClick={handleSignUp}
        className="SignUpButton"
        style={{ textTransform: "none", marginBottom: '50px' }}
        disabled={loading}
      >
        {!loading ? (
          <p className="SignUpText">Continue</p>
        ) : (
          <CircularProgress size={25} style={{ color: "white" }} />
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
    margin: auto;
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

  .google-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    text-align: center;
  }

  .google-login h4 {
    color: white;
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
