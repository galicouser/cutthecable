import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { addRedeemCode } from "../APIs/authAPI";
import { getCodesUser, redeemFreeTrial, userSubscriptionCodes } from "../APIs/redeemAPI";
import { useState } from "react";

const RedeemModal = ({ updateParentValue,data }) => {
  console.log(data);
  const [GeneralDone, setGeneralDone] = useState(true);
  const [redeemCode, setRedeemCode] = useState("");
  const [EmailNotificationDone, setEmailNotificationDone] = useState(false);
  const [updatedData, setUpdatedData] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [selectedValidities, setSelectedValidities] = useState({});
  const email = localStorage.getItem("Email");
  function SignUpClicked() {
    updateParentValue(false);
  }

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    setRedeemCode(inputValue);
  };
  function GeneralMarkedDone() {
    setGeneralDone(!GeneralDone);
    setEmailNotificationDone(!EmailNotificationDone);
  }

  const updateSubParentValue = (selectedFunction) => {
    if (selectedFunction === "functionOne") {
      GeneralMarkedDone();
    } else if (selectedFunction === "functionTwo") {
    }
  };
  const handleRedeemClick = async (row) => {
    try {
      const body = await getCodesUser(email, row.subscription_code);
      setUpdatedData(1);
      console.log(body);

      if (!body || Object.keys(body).length === 0) {
        // If body is undefined or empty, show an error snackbar
        setSnackbarMessage("Bad Request: You already have active subscription");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Bad Request: You already have active subscription");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  

  return (
    <Wrapper>
      <AnimatePresence>
        <motion.div
          className="overlay-backdrop"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 1000, damping: 50 }}
        >
          <div className="overlay-content">
            <CloseIcon className="CrossIcon" onClick={SignUpClicked} />
            <div className="LightEffectSub"></div>

            <div className="MainGrid">
              <div className="InputFields">
                <p className="SignInTitle">Select Payment Method</p>
                <div className="PasswordHolder">
                  <input
                    className={"ForgotInputFieldGeneral"}
                    type="text"
                    placeholder="Enter your device MAC/SN or Device Name"
                    value={redeemCode}
                    onChange={handleCodeChange}
                  />
                </div>
                <Button
          variant="contained"
          onClick={() => handleRedeemClick(data)}
          className="SignUpButton"
          style={{ textTransform: "none" }}
        >
          <>
            <p className="SignUpText"> Submit</p>
          </>
        </Button>
              </div>
              
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .overlay-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75); /* Semi-transparent backdrop */
    z-index: 2;
  }
  button {
    background-color: #BB434D;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
   cursor:pointer;
  }
  .ImageHolderSignIn {
    width: 45%;
    height: 100%;
    display: flex;
  }
  .ImageSignUp {
    height: 100%;
    width: 100%;
    border-radius: 0 10px 10px 0;
    object-fit: cover;
  }

  .InputFields {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  }

  .SignInTitle {
    font-size: 35px;
    color: white;
    font-weight: 700;
    padding-left: 5%;
    text-align:center;
  }
  .LightEffectSub {
    border-radius: 60px; /* The first two values (150px 150px) define the top-left and top-right radii, while the last two (0 0) define the bottom-left and bottom-right radii, making them 0 to create a straight edge */
    opacity: 1;
    background: #bb434d;
    width: 70px;
    z-index: 1;
    height: 70px;
    position: absolute;
    left: -35px;
    top: -35px;
    filter: blur(px);
  }
  .LightEffectSub2 {
    border-radius: 60px; /* The first two values (150px 150px) define the top-left and top-right radii, while the last two (0 0) define the bottom-left and bottom-right radii, making them 0 to create a straight edge */
    opacity: 1;
    background: #bb434d;
    width: 120px;
    z-index: 1;
    height: 120px;
    position: absolute;
    right: -60px;
    bottom: -60px;
    filter: blur(px);
  }

  .MainGrid {
    display: flex;
    align-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .overlay-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #b9464e19;
    box-shadow: 0 0 0px 1px rgba(185, 70, 78, 0.4);
    background-color: rgba(28, 31, 37, 1);
    border-radius: 14px;
    height: 70%;
    overflow-y: auto; /* Use 'auto' to enable scrollbars only when content exceeds the container height */
    width: 65%;
  }

  .CrossIcon {
    position: absolute;
    right: 15px;
    top: 10px;
    color: white;
    font-size: 40px;
    background-color: rgba(28, 31, 37, 1);
    border-radius: 10px;
  }
  .CrossIcon:hover {
    cursor: pointer;
  }
  .SignUpButton {
    background-color: #bb434d;
    // width: 200px;
    // height: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5%;
    // margin-bottom:2%;
    height:20px; 
    width:100px; 
    margin: -20px -50px; 
    position:relative;
    top:5%; 
    left:50%;
  }
  .SignUpButton:hover {
    cursor: pointer;
    background-color: transparent;
  }
  @media (max-width: 767px) {
    position: absolute;
    justify-content: center;
    z-index: 20;

    button {
        background-color: #BB434D;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
       cursor:pointer;
      }
    .overlay-content {
      width: 80%;
      height: 77%;
      padding: 20px;
      padding-bottom: 30px;
    }

    .SignInTitle {
      font-size: 23px;
    }

    .CrossIcon {
      font-size: 35px;
      right: 5px;
    }
    .ImageHolderSignIn {
      display: none;
    }
    .LightEffectSub {
      display: none;
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
  }
  @media (min-width: 800px) and (max-width: 950px) {
    .overlay-content {
      width: 80%;
      height: 40%;
    }
  }
`;
export default RedeemModal;
