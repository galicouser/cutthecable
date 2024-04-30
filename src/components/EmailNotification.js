import styled from "styled-components";
import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EmailNotification = () => {
  return (
    <Wrapper>
      <CheckCircleIcon className="DoneIcon" />
      <p className="Text">Thank you for registering! Your request will now be processed, and a verification email will be sent shortly to provided email.
      </p>
    </Wrapper>
  )

}
const Wrapper = styled.section`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
align-content:center;
height:60%;

.DoneIcon{
    font-size:100px;
    color:white;

}
.Text{
    width:75%;
    text-align:center;
    color:white;
    font-size:25px;
    font-weight:700;
}
.SignUpButton {
    background-color: #BB434D;
    width: 200px;
    height:50px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-divs: center;
    border-radius: 5px;
   
  }
  .SignUpButton:hover {
   cursor:pointer;
   background-color: transparent;
}
  .SignUpText {
    font-size: 15px;
    font-weight: 100;
    color: white;
  }
  @media (max-width: 767px) {
    .DoneIcon{
      margin-top:40%;
    }
  }

`

export default EmailNotification;