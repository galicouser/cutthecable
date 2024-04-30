// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Button from "@mui/material/Button";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
// import Box from '@mui/material/Box';
// import { createCheckout } from "../APIs/checkoutAPI";
// import { getAllSubscriptionsUser } from "../APIs/subscriptionsAPI";
// import InputLabel from '@mui/material/InputLabel';
// import CircularProgress from "@mui/material/CircularProgress";
// import Backdrop from "@mui/material/Backdrop";
// import { redeemValidityProductCount } from "../APIs/redeemAPI";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import PaymentModal from './PaymentModal';

// const ChangePlan = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("error");
//   const [selectedValidities, setSelectedValidities] = useState({});
//   const [selectedMetadataIds, setSelectedMetadataIds] = useState({});
//   const [selectedMetadataObjects, setSelectedMetadataObjects] = useState({});
//   const [SignUpOverlay, setSignUpOverlay] = useState(false);
//   const [dataToSend, setDataToSend] = useState('');

//   const [subscriptionLength, setSubscriptionLength] = useState('');
//   const [connectionAmount, setConnectionAmount] = useState('');

//   const email = localStorage.getItem("Email");
//   function SignUpClicked(ditem, dselectedMetadata, dselectedValidity) {
//     const dataToConsolidate = { ditem: ditem, metadata: dselectedMetadata, sValidities: dselectedValidity };
//     console.log(dataToConsolidate);
//     setDataToSend(dataToConsolidate);
//     setSignUpOverlay(!SignUpOverlay);
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseData = await getAllSubscriptionsUser();
//         setData(responseData.data.productSummaryArray);
//         console.log(data.productSummaryArray);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleValidityChange = (subscriptionId, event, metadata) => {
//     setSelectedValidities((prevState) => ({
//       ...prevState,
//       [subscriptionId]: event.target.value,
//     }));

//     setSelectedMetadataIds((prevState) => ({
//       ...prevState,
//       [subscriptionId]: metadata._id,
//     }));

//     setSelectedMetadataObjects((prevState) => ({
//       ...prevState,
//       [subscriptionId]: metadata,
//     }));
//   };

//   return (
//     <Wrapper>
//       {SignUpOverlay && <PaymentModal data={dataToSend} updateParentValue={SignUpClicked} />}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <MuiAlert
//           elevation={6}
//           variant="filled"
//           severity={snackbarSeverity}
//           onClose={() => setOpenSnackbar(false)}
//         >
//           {snackbarMessage}
//         </MuiAlert>
//       </Snackbar>

//       <p className="TitleText">Subscription Packages</p>
//       {loading ? (
//         // Display loader while data is being fetched.
//         <Backdrop open={loading}>
//           <CircularProgress color="inherit" />
//         </Backdrop>
//       ) : data.length > 0 ? (
//         // Conditionally render Package cards when data is available.
//         <div className="PlanSelection">
//           {data.map((item) => (
//             <Package key={item.id}>
//               <h2>Cut The Cable</h2>
//               <p>digital subscription for cutthecable</p>
//               <div className="plan-options">
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Subscription Length</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={null}
//                   label="Age"
//                   onChange={null}
//                 >
//                   <MenuItem value={null}>1 month</MenuItem>
//                   <MenuItem value={null}>Twenty</MenuItem>
//                   <MenuItem value={null}>Thirty</MenuItem>
//                   <MenuItem value={null}>Thirty</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Connections</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={null}
//                   label="Age"
//                   onChange={null}
//                 >
//                   <MenuItem value={10}>Ten</MenuItem>
//                   <MenuItem value={20}>Twenty</MenuItem>
//                   <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//               </FormControl>
//               </div>
//               {/* <div className="ValiditySelect">
//                 <Select
//                   value={selectedValidities[item.id] || ""}
//                   onChange={(event) =>
//                     handleValidityChange(
//                       item.id,
//                       event,
//                       item.metadata.find(
//                         (metadataItem) =>
//                           metadataItem.validity === event.target.value
//                       )
//                     )
//                   }
//                 >
//                   {item.metadata.map((metadataItem) => (
//                     <MenuItem
//                       key={metadataItem._id}
//                       value={metadataItem.validity}
//                     >
//                       {metadataItem.pricedesc}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </div> */}
//               <Button
//                 variant="contained"
//                 className="ProceedButton"
//                 style={{ textTransform: "none" }}
//                 onClick={async () => {
//                   const selectedValidity =
//                     selectedValidities[item.id] ||
//                     item.metadata[0].validity.toString()

//                   const selectedMetadataId = selectedMetadataIds[item.id];
//                   const selectedMetadata = selectedMetadataObjects[item.id];
//                   {/* console.log(selectedMetadata) */}

//                   if (selectedValidity) {
//                     const body = await redeemValidityProductCount(
//                       selectedMetadata._id,
//                       selectedValidity
//                     );
//                     if (body.data.message === "Subscription code not available") {
//                       setSnackbarMessage(
//                         "Bad Request: This Plan is not available, Try Another."
//                       );
//                       setSnackbarSeverity("error");
//                       setOpenSnackbar(true);
//                     } else {
//                     SignUpClicked(item, selectedMetadata, selectedValidity)

//                     }
//                   } else {
//                     // If no validity is selected, show an error message or handle it as needed.
//                     console.error("Please select a validity option.");
//                   }
//                 }}
//                 disabled={!selectedValidities[item.id]}
//               >
//                 Purchase Plan
//               </Button>
//             </Package>
//           ))}
//         </div>
//       ) : (
//         // Render a message when data is empty.
//         <p>No subscription packages available.</p>
//       )}
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   margin-top: 4.5%;
//   width: 100%;
//   .TitleText {
//     font-size: 50px;
//     color: #1c1f25;
//     padding-left: 105px;
//     margin-bottom: 0px;
//     font-weight: 100;
//   }
//   .PlanSelection {
//     width: 90%;
//     margin-left: 20px;
//     display: flex;
//     flex-direction:column;
//     justify-content: center;
//     align-items: center;
//   }

//   .ProceedButton {
//     background-color: #BB434D;
//     width: 90%;
//     height:90%;
//     border-radius: 5px;
//     margin-top: 2.5%;
//   }


//   @media (max-width: 900px) {
//     .TitleText {
//       color: #1c1f25;
//       margin-bottom: 0px;
//       padding-left: 0px;
//       text-align: center;
//     }
//     .PlanSelection {
//       width: 90%;
//       flex-direction: column;
//       display: grid;
//       padding-left: 0px;
//       margin-left: 0px;
//     }
//   }
//   @media (max-width: 850px) {
//     margin-top: 10%;
//     width: 100%;
//     .TitleText {
//       padding-left: 10%;
//     }
//     .PlanSelection {
//         width: 95%;
//         margin-left: 0px;
//     }
//   }
// `;

// const Package = styled.div`
//   border: 1px solid #ccc;
//   padding: 20px;
//   text-align: center;
//   border-radius: 10px;
//   width: 50%;
//   margin-top: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   background-color: #f9f9f9;
//   h2 {
//     font-size: 24px;
//     color: #333;
//   }
//   p {
//     margin: 8px 0;
//   }
//   button {
//     background-color: #BB434D;
//     color: white;
//     border: none;
//     padding: 10px 20px;
//     border-radius: 5px;
//     cursor: pointer;
//   }
//   button:hover {
//    cursor:pointer;
//   }

//   @media (max-width: 850px) {
//     width: 100%;
//   }
// `;

// export default ChangePlan;
