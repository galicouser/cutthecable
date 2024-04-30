import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionPackage, selectSubscriptionPlan, setSubscriptionLength, setNumberDevices } from '../actions/subscriptionActions';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';

import { createPaypalOrder, createStripeOrder } from '../../APIs/checkoutAPI'; // Import your function to initiate PayPal checkout
import './css/Plans.css';


const Plans = () => {
  const dispatch = useDispatch();
  const subscriptionPackages = useSelector(state => state.subscription.plans);
  const selectedPackage = useSelector(state => state.subscription.selectedPlan);
  // const [subscriptionLength, setSubscriptionLength] = useState('');
  // const [numberDevices, setNumberDevices] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const subscriptionLength = useSelector(state => state.subscription.subscriptionLength)
  const numberDevices = useSelector(state => state.subscription.numberDevices);
  const [openModal, setOpenModal] = useState(false);
  const [inEditMode, setInEditMode] = useState(null);
  const [newPrice, setNewPrice] = useState('');

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // const handleEditClick = (e) => {
  //   /** TODO: check username === admin , true OR write test to check */
  //   setInEditMode(!inEditMode);
  // }

  const handlePaymentMethodSelect = async (method) => {
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

  const handleEditClick = () => {
    setInEditMode(!inEditMode);
  };

  const handlePriceChange = () => {

  };

  const findSubscriptionPackage = (duration, connections) => {
    return subscriptionPackages.find(subscriptionPackage => subscriptionPackage.duration === duration && subscriptionPackage.connections === connections);
  };

  // Filter out duplicate durations
  const uniqueDurations = Array.from(new Set(subscriptionPackages.map(subscriptionPackage => subscriptionPackage.duration)));

  return (
    <div className="admin-plans-container">
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
          <InputLabel id="number-devices-label">Number of Devices</InputLabel>
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
      <div className="total-price-container">
  {inEditMode ? (
    <input
      type="text"
      className="TotalPriceTop"
      value={selectedPackage ? `$${selectedPackage.price} USD` : ''}
      onChange={(e) => handlePriceChange(e.target.value)}
    />
  ) : (
    <p className="TotalPriceTop">
      Total Price: {selectedPackage ? `$${selectedPackage.price} USD` : 'Select a subscription package'}
    </p>
  )}
  <EditIcon
    className="edit-icon"
    fontSize="small"
    onClick={handleEditClick} />
</div>
     {selectedPackage && (
       <div className="center-button">
         <Button onClick={handleOpenModal}>Choose Payment Method</Button>
       </div>
     )}
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
    </div>
  );
};

export default Plans;
