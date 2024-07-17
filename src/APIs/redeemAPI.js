import axios from "axios";

const axiosAPI = axios.create({
    //baseURL: "https://nocableneeded-auth.onrender.com/",
    // baseURL: "1738api.cutthecable.org",
    //baseURL: "https://1738api.cutthecable.org",
    baseURL: "http://localhost:4242"
    // baseURL: "https://ctc-test-be.netlify.app"
});

export const createCode = async (code, duration) => {
    try {
        return await axios.post("codes/create-code", {
            code, duration
        });
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};

export const getCodes = async () => {
    try {
        return await axios.get('/codes/fetch-all');
    } catch (err) {
        console.error('error adding code: ', err);
    }
}

export const getCodesUser = async (email, code) => {
    try {
        return await axios.post("/redeem/availredeemcode", {
            email: email,
            code: code,
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};


export const adminPostedCodes = async (email) => {
    try {
        return await axios.get("/redeem/getredeemcodes", {
            email: email
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};

export const userSubscriptionCodes = async (email) => {
    try {
        return await axiosAPI.post("/codes/getusersubscription", {
           "email":email
        });
    } catch (err) {
        console.log("Error signing up", err);
    }

};

export const redeemValidityProductCount = async (item_id, validity) => {
    try {
        return await axios.post("/redeem/ValidityProductCount", {
            "item_id":item_id,
            "validity":validity
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};



export const redeemFreeTrial = async (email, code) => {
    try {
        return await axios.post("/redeem/availtrialcode", {
            email: email,
            code: code,
        });
    } catch (err) {
        console.log(err.response.data.message);
    }
};

// Function to delete a redeem code
export const deleteRedeemCode = async (id, callback) => {
    try {
      const response = await axios.post("/codes/delete-code", {
        id
      });

      if (response.status === 204) {
        callback();
      }

      return response;
    } catch (err) {
      console.log("Error deleting redeem code", err);
    }
  };

  // Function to update a redeem code
  export const updateRedeemCode = async (id,userId, action,callback) => {
    try {
        const response = await axios.post("/codes/update-code", {
            "id":id,
            "userId":userId,
            "action":action,
        });
        if (response.status === 200) {
            callback();
          }
          return response;
    } catch (err) {
        console.log("Error deleting redeem code", err);
    }
};
