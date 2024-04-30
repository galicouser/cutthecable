import axios from "axios";

const axiosAPI = axios.create({
    //baseURL: "https://nocableneeded-auth.onrender.com/",
    // baseURL: "https://1738api.nocableneeded.net/",
    // baseURL: "http://localhost:4242",
    baseURL: "https://1738api.cutthecable.org",
    // baseURL: "https://ctc-test-be.netlify.app"
});

export const signupUser = async (email, password, username, profile_picture) => {
    try {
        return await axios.post("/auth/signup-user", {
            email: email,
            password: password,
            userName: username,
            profile_picture: profile_picture
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};

export const updateusers = async (id, action) => {
    try {
        return await axios.post("/auth/update-users", {
            id: id,
            action: action
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};

    export const fetchusers = async () => {
        try {
            return await axios.get("/auth/get-users", {
            });
        } catch (err) {
            console.log("Error signing up", err);
        }
    };

export const loginUser = async (username, password) => {
    const response = await axios.post("/auth/login-user", {
        userName: username,
        password: password,
    });
    return response.data;
    // try {
    //   return await axios.post("/auth/login-user", {
    //     userName: username,
    //     password: password,
    //   });
    // } catch (err) {
    //   console.log("Error logging in :", err);
    //   return err;
    // }
};


export const updateProfilePicture = async (username, picture) => {
    const response = await axios.post("/auth/change-profile-picture", {
        userName: username,
        newProfilePictureUrl: picture,
    })
        .then((response) => {
            console.log("Profile picture updated:", response.data.message);
            console.log("Updated user data:", response.data.user);
        })
        .catch((error) => {
            console.error("Error changing profile picture:", error.response.data.message);
        });

    return response;
};

export const initiateResetPassword = async (email) => {
    try {
        return await axios.post("/auth/forgot-password", {
            email: email,
        });
    } catch (err) {
        console.log("Error! initiate reset password : ", err);
        return err;
    }
};

export const resetPassword = async (email, verificationToken, password) => {
    try {
        return axios.post("/auth/reset-password", {
            email: email,
            verificationToken: verificationToken,
            password: password,
        });
    } catch (err) {
        console.log("Error resetting password : ", err);
    }
};

export const verifyToken = async (email, verificationToken) => {
    try {
        return axios.post("/auth/verify", {
            email: email,
            verify_token: verificationToken
        });
    } catch (err) {
        console.log("Error resetting password : ", err);
    }
    // try {
    //     const baseUrl="https://1738api.nocableneeded.net/auth/api/verify";
    //     //const baseUrl = "https://nocableneeded-auth.onrender.com/auth/api/verify";
    //     const queryParams = new URLSearchParams({
    //         email: email,
    //         verify_token: verificationToken,
    //     });

    //     const url = `${baseUrl}?${queryParams.toString()}`;

    //     console.log(url); // This will log the correct URL for debugging purposes

    //     return axios.get(url);
    // } catch (err) {
    //     console.log("Error Validating User: ", err);
    // }
};

// const approvalLink = `https://nocableneeded-auth.onrender.com/auth/api/verify?email=${encodeURIComponent(
//       receiverEmail // Use 'email' from route parameters
//     )}&verify_token=${encodeURIComponent(verify_token)}`;


export const addRedeemCode = async (email, code) => {
    const response = await axios.post("/auth/redeem-code", {
        email: email,
        code: code,
    })
        .then((response) => {
            console.log("Redeem Code Added:", response.data.message);
        })
        .catch((error) => {
            console.error("Error Adding Redeem Code:", error.response.data.message);
        });

    return response;
};