import axios from "axios";

const axiosAPI = axios.create({
    //baseURL: "https://nocableneeded-auth.onrender.com/",
    // baseURL: "https://1738api.nocableneeded.net/",
    baseURL: "https://1738api.cutthecable.org",
    // baseURL: "http://localhost:4242"
    // baseURL: "https://ctc-test-be.netlify.app"
});

export const createPaypalOrder = async (price, duration, connections, email) => {
  try {
    const response = await axios.post("/checkout/create-paypal", {
        price,
        duration,
        connections,
        email
    });

    return response.data;
  } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw new Error('Error creating PayPal order');
  }
};

export const createStripeOrder = async (price, duration, connections, email) => {
  try {
    const response = await axios.post("/checkout/create-stripe", {
        price,
        duration,
        connections,
        email
    });

    return response.data;
  } catch (error) {
      console.error('Error creating Stripe order:', error);
      throw new Error('Error creating Stripe order');
  }
};

export const createCheckout = async (email, id, name, price, company, description, category, validity,type) => {
    try {
        return await axios.post("/checkout/process", {
            "email": email,
            "type": type,
            "cartItems": [
                {
                    "id": id,
                    "name": name,
                    "price": price,
                    "company": company,
                    "description": description,
                    "category": category,
                    "validity": validity,
                    "cartQuantity": "1"
                }
            ]
        });
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};