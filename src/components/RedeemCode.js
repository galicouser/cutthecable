import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { addRedeemCode } from "../APIs/authAPI";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RedeemModal from './RedeemModal';




import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getCodesUser, redeemFreeTrial, userSubscriptionCodes } from "../APIs/redeemAPI";



const RedeemCode = () => {
  const [redeemCode, setRedeemCode] = useState("");
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [updatedData, setUpdatedData] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [SignUpOverlay, setSignUpOverlay] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [dataToSend, setDataToSend] = useState('');
  function RedeemClicked(rcode) {
    const dataToConsolidate = { rcode: rcode };
    console.log(dataToConsolidate);
    setDataToSend(dataToConsolidate);
    setSignUpOverlay(!SignUpOverlay);
  }

  const email = localStorage.getItem("Email");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await userSubscriptionCodes(email);
        const formattedData = responseData.data.data.map((row, index) => ({
          ...row,
          id: index + 1, // You can use any unique identifier you prefer
        }));

        if (responseData.data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setData(formattedData);

          const activeSubscription = formattedData.find(
            (subscription) => subscription.status === "active"
          );

          if (activeSubscription) {
            setActiveSubscription(activeSubscription);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updatedData]);

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    setRedeemCode(inputValue);
  };

  function ProceedClicked() {
    const email = localStorage.getItem("Email");
    addRedeemCode(email, redeemCode);
  }
  const [isVerified, setisVerified] = useState(false);

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

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "subscription_code", headerName: "Redeem Code", width: 150 },
    { field: "validity", headerName: "Validity", width: 150 },
    { field: "user", headerName: "Assigned User", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "redeemButton",
      headerName: "Redeem",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          disabled={params.row.status === "active"} // Disable the button for rows with status "active"
          onClick={async () => { RedeemClicked(params.row)}}
        >
          Redeem
        </Button>
      ),
    },
  ];

  return (
    <Wrapper>
      {SignUpOverlay && <RedeemModal data={dataToSend} updateParentValue={RedeemClicked} />}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>


      {noData &&
        <div className="noData" style={{ height: '100vh' }}>
          <p className="TitleText">Please Purchase A Subscription</p>
          <div className="InputTitle">
            <p className="InputTitleText">Start Your Free Trial, Now!</p>
          </div>
          <div className="PasswordHolder">
            <input
              className={"ForgotInputFieldGeneral"}
              type="text"
              placeholder="Enter your subscription code"
              value={redeemCode}
              onChange={handleCodeChange}
            />
          </div>

          <div className="PasswordHolder">
          <Button
              variant="contained"
              onClick={async () => {
                const data = await redeemFreeTrial(email,redeemCode);
                console.log(data)
                setUpdatedData(1);
              }}
              className="ProceedButton"
              style={{ textTransform: "none" }}
            >
              <p className="SignUpText">Click Here To Avail</p>
            </Button>
            </div>

        </div>
      }
      {!noData &&
        <>
          <p className="TitleText">Subscription Code Status</p>
{/* 
          <div className="statusHolder">
            {activeSubscription != null ? <CheckCircleOutlineIcon className="CheckIcon" /> : <RemoveDoneIcon className="CheckIcon2" />}
            {activeSubscription != null ? <p>Current Code: {activeSubscription.subscription_code}</p> : <></>}
            {activeSubscription != null ? (
              <p>
                Valid Till:{" "}
                {new Date(activeSubscription.date_of_expiry).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            ) : (
              <></>
            )}
          </div> */}

          <div className="RedeemCode">
            <div className="InputHolder">
              <Grid item lg={5.5} className="InnerHolder">
                <p className="SubTitleText">
                  Your Redeem Codes
                </p>
              </Grid>
            </div>
          </div>
          <div className="AccordianHolder">
            <Accordion style={{ marginTop: '20px', zIndex: '10' }} className="MainHolder">
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="active-subscriptions-content" id="active-subscriptions-header">
                Available Subscriptions
              </AccordionSummary>
              <AccordionDetails>
                <DataGrid
                  rows={data} // Use the data state to populate rows dynamically
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      }
    </Wrapper>
  );
};
const Wrapper = styled.section`
margin-top:4.5%;
height:100%;
width: 100%;

.ProceedButton {
    background-color: #BB434D;
    width: 200px;
    height:55px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 1%;
  }
  .DatagridHolder{
    width:85%;
    display: flex;
    justify-content: center;
  }
  .ProceedButton:hover {
   cursor:pointer;
  }
  .AccordianHolder{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
  }
  .MainHolder{
    width: 90%;
  }
  .InnerHolder{
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
  }
.InputHolder{
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
    text-align: center;
}
.ForgotInputFieldGeneral {
    width: 300px;
    height:40px;
    margin-top: 0;
    border-radius:5px;
    font-size:18px;
  }
  .PasswordHolder{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .ForgotInputFieldGeneral:focus {
   outline:none;
  }
.TitleText{
    font-size:35px;
    color: #1c1f25;
    margin-bottom:0px;
    font-weight:100;
    margin-left: 20px;
}
.InputTitle {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
  }
  .InputTitleIcon {
    color:  #1c1f25;
    font-size: 20px;
    margin-right:2.5%;
  }
  .InputTitleText {
    color:  #1c1f25;
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
.statusHolder{
    height: 200px;
    margin-top:0px;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-content:center;
    align-items:center;
    border-bottom: 1px solid rgb(0,0,0,0.2);
}
.CheckIcon{
  font-size: 50px;
  color: green;
}
.CheckIcon2{
  font-size: 50px;
  color: red;
}
.statusBackground{
  width: 500px;
  height: 200px;
  background-color: #1c1f25;
  opacity: 0.5;
  position: absolute;
}
@media (max-width: 767px) {


  .noData{
    margin-top: 20%;
  }
  
display: grid;
justify-content: center;
place-content: center;
align-items: center;
    .ProceedButton{
      margin-left: 0%;
    }
    .MainHolder{
    width: 350px;
  }
    .TableHolder{
      width:350px;
      overflow-x: auto;
    }
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
}`;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   th,
//   td {
//     padding: 8px;
//     text-align: left;
//     border-bottom: 1px solid #ddd;
//   }

//   th {
//     background-color: #f2f2f2;
//   }

//   tbody tr:hover {
//     background-color: #f5f5f5;
//   }
//   @media (max-width: 767px) {

//   }
// `;

export default RedeemCode;