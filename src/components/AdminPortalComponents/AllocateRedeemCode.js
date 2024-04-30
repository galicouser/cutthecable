import styled from "styled-components";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';


const AllocateRedeemCode = () => {

  const [redeemCode, setRedeemCode] = useState("");

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    setRedeemCode(inputValue);
  };
  function ProceedClicked() {
    
  }
  return (
    <Wrapper>
      <p className="TitleText">Allocate Redeem Code</p>
      <div className="RedeemCode">
        <div className="InputHolder">
          <Grid item lg={5.5}>

            <div className="InputTitle">
              <LockIcon className="InputTitleIcon" />
              <p className="InputTitleText">Redeem Code</p>
            </div>
            <div className="PasswordHolder">
              <input
                className={"ForgotInputFieldGeneral"}
                type="text"
                value={redeemCode}
                onChange={handleCodeChange}
              />
            </div>
            <div className="InputTitle">
              <PersonIcon className="InputTitleIcon" />
              <p className="InputTitleText">Username</p>
            </div>
            <div className="PasswordHolder">
              <input
                className={"ForgotInputFieldGeneral"}
                type="text"
              />
            </div>

            <Button
              variant="contained"
              onClick={ProceedClicked}
              className="ProceedButton"
              style={{ textTransform: "none" }}
            >
              <p className="SignUpText">Allocate</p>
            </Button>
          </Grid>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
margin-top:4.5%;
height:100%;
padding-left:5%;

.ProceedButton {
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
  .ProceedButton:hover {
   cursor:pointer;
}
.InputHolder{
    padding-top:5%;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
 
}
.SubTitleText{
    color: #1c1f25;
    font-size:22px;
    font-weight:100;
    margin-bottom:0px;
}
.ForgotInputFieldGeneral {
    width: 100%;
    height:40px;
    margin-top: 0;
    border-radius:5px;
    font-size:18px;
  }
  .ForgotInputFieldGeneral:focus {
   outline:none;
  }
.TitleText{
    font-size:35px;
    color: #1c1f25;
    margin-bottom:0px;
    font-weight:100;
}
.InputTitle {
    display: flex;
    align-content: center;
    align-items: center;
    margin-bottom: 0;
    width: 300px;
  }
  .InputTitleIcon {

    color: #1c1f25;
    font-size: 20px;
    margin-right:2.5%;
  
  }
  .InputTitleText {
    color: #1c1f25;
    font-size: 20px;
    font-weight:00;
    
  }
.RedeemCode{
    width:100%;
    margin-top:0px;
    display:flex;
    justify-content:center;
    align-content:center;
    align-items:center;
}
@media (max-width: 767px) {
    .TitleText{
        color: #1c1f25;
        margin-bottom:0px;
        padding-left:0px;
        text-align:center;
    }
    .RedeemCode{
        width:100%;
        padding-left:0px;
    }
    .SubTitleText{
        color: #1c1f25;
        font-size:22px;
        font-weight:100;
        margin-bottom:0px;
    }
}

`;
export default AllocateRedeemCode;
