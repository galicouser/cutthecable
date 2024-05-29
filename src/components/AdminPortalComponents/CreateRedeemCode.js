import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { fetchSubscriptionPackage, selectSubscriptionPlan } from '../actions/subscriptionActions';
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllSubscriptions } from "../../APIs/subscriptionsAPI";
import { createCode } from "../../APIs/redeemAPI";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const CreateRedeemCode = () => {
  const dispatch = useDispatch();
  const subscriptionPackages = useSelector(state => state.subscription.plans);
  const selectedPackage = useSelector(state => state.subscription.selectedPlan);

  const [redeemCode, setRedeemCode] = useState("");
  const [selectedValidity, setSelectedValidity] = useState("1 Month");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedSubscriptionData, setSelectedSubscriptionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubscriptionMetadata, setSelectedSubscriptionMetadata] = useState([]);
  const [selectedMetadata, setSelectedMetadata] = useState("");
  const [isProceedDisabled, setIsProceedDisabled] = useState(true);

  const [selectedSubscriptionLength, setSelectedSubscriptionLength] = useState(1);
  const [subscriptionCode, setSubscriptionCode] = useState('');


  const [data, setData] = useState([]);

  useEffect(() => {
    if (subscriptionCode.length > 0 && selectedSubscriptionLength > 0) {
      setIsProceedDisabled(false);
    } else {
      setIsProceedDisabled(true);
    }
  }, [subscriptionCode, selectedSubscriptionLength]);

  const planOptions = [1, 3, 6, 12];

  const handleCodeChange = (e) => {
    const { value } = e.target;
    setSubscriptionCode(value);
  };

  const handleSubscriptionChange = (e) => {
    const { value } = e.target;

    setSelectedSubscriptionLength(value);
  };

  async function ProceedClicked() {
    setIsLoading(true);

    const duration = selectedSubscriptionLength;
    const code = subscriptionCode;

    const response = await createCode(code, duration);

    if (response === undefined) {
      alert('Cannot add duplicate code');
    } else {
      alert('Prepay code added');
    }

    setSubscriptionCode('');
    setIsLoading(false);
  }

  return (
    <Wrapper>

      {isLoading && (
        <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <p className="TitleText">Create Prepay Code</p>
      <div className="RedeemCode">
        <div className="InputHolder">
          <Grid item lg={5.5}>
            <div className="InputTitle">
              <LockIcon className="InputTitleIcon" />
              <p className="InputTitleText">Prepay Code</p>
            </div>
            <div className="PasswordHolder">
              <input
                className="ForgotInputFieldGeneral"
                type="text"
                value={subscriptionCode}
                onChange={handleCodeChange}
              />
            </div>

            <div className="InputTitle">
              <p className="InputTitleText">Plan Length</p>
            </div>
            <div className="PasswordHolder">
              <Select
                value={selectedSubscriptionLength}
                onChange={handleSubscriptionChange}
                style={{ width: '300px', marginTop: '0px' }}
              >
                {planOptions.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    Cut The Cable - {item} Month
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button
              variant="contained"
              onClick={ProceedClicked}
              className="ProceedButton"
              style={{ textTransform: "none" }}
              disabled={isProceedDisabled} // Disable the button conditionally
            >
              <p className="SignUpText">Proceed</p>
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
        margin-bottom:0px;
        padding-left:0px;
        text-align:center;
    }
    .RedeemCode{
        width:100%;
        padding-left:0px;
    }
    .SubTitleText{
        font-size:22px;
        font-weight:100;
        margin-bottom:0px;
    }
}

`;
export default CreateRedeemCode;
