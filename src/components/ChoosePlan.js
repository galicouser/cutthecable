import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionPackage, selectSubscriptionPlan, setSubscriptionLength, setNumberDevices } from './actions/subscriptionActions';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Stepper, Step } from 'react-form-stepper';

import { createPaypalOrder, createStripeOrder } from '../APIs/checkoutAPI'; // Import your function to initiate PayPal checkout
import { getCodesUser, redeemFreeTrial, userSubscriptionCodes,getUserSubCode } from "../APIs/redeemAPI";
import './css/ChoosePlan.css';


const ChoosePlan = () => {
  const dispatch = useDispatch();
  const subscriptionPackages = useSelector(state => state.subscription.plans);
  const selectedPackage = useSelector(state => state.subscription.selectedPlan);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState(null);
  // const [subscriptionLength, setSubscriptionLength] = useState('');
  // const [numberDevices, setNumberDevices] = useState(1);
  const [SignUpOverlay, setSignUpOverlay] = useState(false);
  const [updatedData, setUpdatedData] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const subscriptionLength = useSelector(state => state.subscription.subscriptionLength)
  const numberDevices = useSelector(state => state.subscription.numberDevices);
  const [openModal, setOpenModal] = useState(false);
  const [dataToSend, setDataToSend] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [renewalCode, setRenewalCode] = useState('');
  const [isRenewal, setIsRenewal] = useState(false);
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
  
  useEffect(() => {
    dispatch(fetchSubscriptionPackage());
  }, []);

  const handleSubscriptionChange = (event) => {
    const length = event.target.value;

    dispatch(selectSubscriptionPlan(findSubscriptionPackage(length, numberDevices)));

    dispatch(setSubscriptionLength(length))
  }

  const handleDeviceChange = (event) => {
    const devices = event.target.value
    dispatch(selectSubscriptionPlan(findSubscriptionPackage(subscriptionLength, devices)));
    dispatch(setNumberDevices(devices));
  };

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveStep(0); // Reset steps on close
    setRenewalCode(''); // Reset the renewal code
    setIsRenewal(false); // Reset the renewal flag
  };

  const handleRenewalClick = () => {
    setIsRenewal(true);
    setActiveStep(1); // Move to the next step for code input
  };

  const handleNewPurchaseClick = () => {
    setIsRenewal(false);
    setActiveStep(2); // Skip code input and move to payment selection
  };

  const handleCodeInputChange = (event) => {
    setRenewalCode(event.target.value);
  };

  const handleNextStep = async () => { // Make the function async
    if (isRenewal && !renewalCode) {
      alert('Please enter your renewal code.');
      return;
    }
  
    // Check code validity
    // const { validity } = await getUserSubCode(email, renewalCode);
    // console.log(validity);
    // console.log(validity.message);
    const result = await getUserSubCode(email, renewalCode);

    if (result && result.result === "error") {
        // console.log("Error from server:", result.message);
        alert(result.message);
        // Handle the error or display the message to the user
    } else if (result && result.result === "success") {
        const { validity } = result;
        console.log("Validity:", validity);
        // Proceed with using the validity data
    } else {
        alert("something went wrong");
        console.log("No validity information found.");
    }
    
};
  
  

  const handleBackStep = () => {
    console.log(typeof activeStep);

    console.log(activeStep);
    console.log(isRenewal);
    if(!isRenewal && activeStep==2){
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    
  };

  const handlePaymentMethodSelect = async (method) => {
    console.log(`Selected payment method: ${method}`);
    // Move to the next step or finish the process
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setPaymentMethod(method);
    setOpenModal(false);

    if (method === 'PayPal' && selectedPackage !== null) {
      const { price, duration, connections } = selectedPackage;
      const email = localStorage.getItem('Email');

      try {
        const { redirectUrl } = await createPaypalOrder(price, duration, connections, email);

        window.location = redirectUrl;
      } catch (error) {
        console.log('error initiating paypal checkout: ', error);
      }
    } else if (method === 'Stripe' && selectedPackage !== null) {
      const { price, duration, connections } = selectedPackage;
      const email = localStorage.getItem('Email');

      try {
        const redirectUrl = await createStripeOrder(price, duration, connections, email);

        window.location = redirectUrl;
      } catch (error) {
        console.log('error initiating stripe checkout: ', error);
      }
    }
  };

  const findSubscriptionPackage = (duration, connections) => {
    return subscriptionPackages.find(subscriptionPackage => subscriptionPackage.duration === duration && subscriptionPackage.connections === connections);
  };

  // Filter out duplicate durations
  const uniqueDurations = Array.from(new Set(subscriptionPackages.map(subscriptionPackage => subscriptionPackage.duration)));

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "code", headerName: "Code", width: 150 },
    { field: "duration", headerName: "Validity", width: 150 },
    { field: "activated", headerName: "Activated", width: 150 },
    {
      field: "redeemButton",
      headerName: "Redeem",
      width: 130,
      renderCell: (params) => (
        <Button
          className="rdeembtn"
          variant="contained"
          color="primary"
          disabled={params.row.activated == true} // Disable the button for rows with status "active"
          onClick={async () => { RedeemClicked(params.row)}}
        >
          Redeem
        </Button>
      ),
    },
  ];

  return (
    <div className="choose-plan-container">
      <h1>Subscription Packages</h1>
      <p>Digital subscription for Cut The Cable, pricing starting at $9.99</p>
      <Box sx={{ minWidth: 120 }}>

        <FormControl fullWidth>
          <InputLabel id="subscription-length-label">Subscription Length</InputLabel>
          <Select
            labelId="subscription-length-label"
            id="subscription-length-select"
            value={subscriptionLength}
            onChange={handleSubscriptionChange}
          >
            {uniqueDurations.map(duration => (
              <MenuItem key={duration} value={duration}>
                {duration} {duration === 1 ? 'Month' : 'Months'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="number-devices-label">Number of TVs</InputLabel>
          <Select
            labelId="number-devices-label"
            id="number-devices-select"
            value={numberDevices}
            onChange={handleDeviceChange}
          >
            {[1, 2, 3, 4, 5].map(numDevices => (
              <MenuItem key={numDevices} value={numDevices}>{numDevices}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div>
        <p className="TotalPriceTop">
          Total Price: {selectedPackage ? `$${selectedPackage.price} USD` : 'Select a subscription package'}
        </p>
     </div>
     {selectedPackage && (
       <div className="center-button">
         <Button onClick={handleOpenModal}>Choose Payment Method</Button>
       </div>
     )}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <Stepper activeStep={activeStep}>
            <Step label="Select Option" />
            <Step label="Enter Code" />
            <Step label="Choose Payment" />
            {/* <Step label="Confirm Payment" /> */}
          </Stepper>

          <div className="step-content">
            {activeStep === 0 && (
              <div>
                <h2>Select an Option</h2>
                <Button onClick={handleRenewalClick}>Renewal</Button>
                <Button onClick={handleNewPurchaseClick}>New Purchase</Button>
              </div>
            )}

            {activeStep === 1 && isRenewal && (
              <div>
                <h2>Enter Renewal Code</h2>
                <TextField
                  label="Renewal Code"
                  value={renewalCode}
                  onChange={handleCodeInputChange}
                />
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <Box className="modal-content" sx={{ minWidth: 120 }}>
                  <h2 id="choose-payment-method-modal">Choose Payment Method</h2>
                  <Button onClick={() => handlePaymentMethodSelect('PayPal')}>PayPal</Button>
                  <Button onClick={() => handlePaymentMethodSelect('Stripe')}>Stripe</Button>
                </Box>
              </div>
            )}
          </div>

          <div className="stepper-buttons">
            {activeStep > 0 && (
              <Button onClick={handleBackStep}>
                Back
              </Button>
            )}
            {/* Next button is removed */}
          </div>
        </div>
      </Modal>
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="choose-payment-method-modal"
        aria-describedby="choose-payment-method-description"
        className="modal"
      >
        <Box className="modal-content" sx={{ minWidth: 120 }}>
          <h2 id="choose-payment-method-modal">Choose Payment Method</h2>
          <Button onClick={() => handlePaymentMethodSelect('PayPal')}>PayPal</Button>
          <Button onClick={() => handlePaymentMethodSelect('Stripe')}>Stripe</Button>
        </Box>
      </Modal>
      <div className="RedeemCode">
            <div className="InputHolder">
              <Grid item lg={5.5} className="InnerHolder">
              </Grid>
            </div>
          </div>
          <div className="AccordianHolder">
            <Accordion style={{ marginTop: '20px', zIndex: '10' }} className="MainHolder">
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="active-subscriptions-content" id="active-subscriptions-header">
                Available Subscriptions1
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
    </div>
  );
};

export default ChoosePlan;
