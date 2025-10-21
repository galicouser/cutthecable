const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

// Comment out the validation imports if you want to remove validation temporarily
// const {
//   validateUser,
//   validateLogin,
//   validateEmail,
//   validateResetPasswordCredentials,
// } = require("../middleware/validation");
const { sendTokenEmail, resetPasswordEmail, sendEmail } = require("../utils/emailService");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.signupUser = async (req, res) => {
  const { email, password, userName, profile_picture } = req.body;

  const formatEmail = email.trim().toLowerCase();

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    return res.status(409).send({ message: "Email already in use" });
  }

  const user = await User.findOne({ email: email });
  const username = await User.findOne({ userName: userName });

  /** TODO: FIX THIS LOGIC -- MODIFIED FOR TESTING */
  // if (user && user.isVerified) return res.status(404).send({ message: "User already exists" });
  // if (username && user.isVerified) return res.status(404).send({ message: "Username taken" });

  if (user) return res.status(404).send({ message: "User already exists" });
  if (username) return res.status(404).send({ message: "Username taken" });

  console.log(userName)

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(hashedPassword)

  const verificationToken = crypto.randomBytes(20).toString("hex");
  let newUser = new User({
    email: email,
    password: hashedPassword,
    userName: userName,
    verificationToken: verificationToken,
    profile_picture: profile_picture,
    isVerified: false,
  });

  try {
    const savedUser = await newUser.save();
    await sendTokenEmail(email, verificationToken, userName);
    console.log("User saved");
    return res.status(200).send({ message: "User saved!" });
  } catch (err) {
    console.log("Account not saved", err);
    return res.status(400).send({ message: "Account not saved" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
}


exports.FetchUsers = async (req, res) => {
  try {
    // Exclude users with email "admin@galico.io" from the query
    const users = await User.find({
      email: { $ne: "admin@galico.io" },
      deleted: false
    });


    if (users.length === 0) {
      return res.status(200).send({ message: 'No entries found' });
    }

    const userArray = [];
    for (const user of users) {
      const mergedusers = {
        id: user._id,
        name: user.userName,
        email: user.email,
        verified: user.isVerified
      };
      userArray.push(mergedusers);
    }

    const response = {
      message: `Fetched ${users.length} entries`,
      data: userArray,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};


exports.UpdateUsers = async (req, res) => {
  try {
    const { id, action } = req.body;

    let user = await User.findOne({
      _id: id,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile_picture with the new URL
    if(action =='deactivate'){
      user.isVerified = false;
    }
    else if(action=='deleteuser'){
      user.deleted = true;
    }
    else{
      user.isVerified = true;
    }

    // Save the updated user document
    const updatedUser = await user.save();

    // Respond with the updated user document or a success message
    return res.status(200).json({ message: 'User ' + action, user: updatedUser });
  } catch (error) {
    console.error('Error change user status:', error);
    return res.status(500).json({ message: 'An error occurred while changing user status' });
  }
};

exports.loginUser = async (req, res) => {

  const { userName, password } = req.body;

  try {
    let user = await User.findOne({
      userName: userName,
      isVerified: true,
    });

    if (!user) return res.status(404).send({ message: "Account not found" });

    const hashedPassword = await bcrypt.compare(password, user.password);
    console.log(password)
    if (!hashedPassword) {
      return res.status(404).send({ message: "Invalid email or password" });
    }
    const appToken = createAppToken(user._id).token;

    res.cookie("token", appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        userName: user.userName,
        email: user.email,
        profile_picture: user.profile_picture,
      },
      isNewUser: false,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Login failed" });
  }
};

exports.changeProfilePicture = async (req, res) => {
  try {
    const { userName, newProfilePictureUrl } = req.body;

    let user = await User.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile_picture with the new URL
    user.profile_picture = newProfilePictureUrl;
    console.log(newProfilePictureUrl)

    // Save the updated user document
    const updatedUser = await user.save();

    // Respond with the updated user document or a success message
    return res.status(200).json({ message: 'Profile picture updated', user: updatedUser });
  } catch (error) {
    console.error('Error changing profile picture:', error);
    return res.status(500).json({ message: 'An error occurred while changing the profile picture' });
  }
};



exports.initiateResetPassword = async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: "Wrong email entered" });
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).send({ message: "Account not found" });

  const randomInt = crypto.randomInt(0, 10000);
  const verificationCode = randomInt.toString().padStart(5, "0");

  user.verificationToken = verificationCode;
  const codeUpdated = await user.save();
  if (codeUpdated) {
    await resetPasswordEmail(email, verificationCode);
    return res
      .status(200)
      .send({ message: "Email sent with verification code" });
  } else {
    return res.status(400).send({ message: "Error! email not sent" });
  }
};

exports.resetPassword = async (req, res) => {
  const { error } = validateResetPasswordCredentials(req.body);
  if (error) {
    console.log("validation error : ", error);

    return res.status(400).send({ message: "Wrong data entered" });
  }
  const { email, verificationToken, password } = req.body;

  const user = await User.findOne({
    email: email,
    verificationToken: verificationToken,
  });
  if (!user)
    return res.status(404).send({ message: "Wrong verification code entered" });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  const updatedUser = await user.save();
  if (updatedUser)
    return res.status(200).send({ message: "password changed successfully!" });
  else {
    console.log("password not changed ");

    return res.status(400).send({ message: "password not changed" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is missing.' })
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.redirect('http://localhost:4242/verification-failed?from=verification');
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.redirect('http://localhost:4242/verification-success?from=verification');
  } catch (error) {
    console.error('Verification error:', error);
    return res.redirect('http://localhost:4242/verification-failed?from=verification');
  }
}

// exports.fetchAllUsers = async (req, res) => {
//   try {
//     // Exclude users with email "admin@galico.io" from the query
//     const users = await User.find();

//     if (users.length === 0) {
//       return res.status(200).send({ message: 'No entries found' });
//     }

//     console.log('USERSSS' + users);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ message: 'Internal Server Error' });
//   }
// }

exports.googleAuth = async (req, res) => {
  try {
    let isNewUser = false;

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      isNewUser = true;

      let baseUsername = name.replace(/\s+/g, "").toLowerCase();
      let finalUsername = baseUsername;
      let counter = 1;

      while (await User.findOne({ username: finalUsername })) {
        finalUsername = `${baseUsername}${counter}`;
        counter++;
      }

      const verificationToken = crypto.randomBytes(20).toString("hex");

      user = new User({
        email,
        googleId,
        userName: finalUsername,
        profile_picture: picture,
        verificationToken,
        isVerified: false,
        password: null,
      });

      await user.save();
      await sendTokenEmail(user.email, user.verificationToken, user.userName);
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const appToken = createAppToken(user._id).token;

    res.cookie("token", appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        userName: user.userName,
        email: user.email,
        profile_picture: user.profile_picture,
      },
      isNewUser,
    });


  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Google auth failed" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

const createAppToken = (userId) => ({
  token: jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
)});