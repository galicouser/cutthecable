const nodemailer = require("nodemailer");

const sendTokenEmail = async (receiverEmail, verify_token,username) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.com", // Replace with the SMTP server for Mail.com
      port: 587, // Common port for SMTP. Use 465 for SSL.
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    const approvalLink = `http://localhost:4242/auth/verifyuser?email=${encodeURIComponent(
      receiverEmail
    )}&verify_token=${encodeURIComponent(verify_token)}`;

    const ccedEmail = ['cutthecable@techie.com']

    const sendTokenLink = `http://localhost:4242/auth/send-token/${encodeURIComponent(
      receiverEmail
    )}/${encodeURIComponent(verify_token)}`;


    const mail_config = {
      from: process.env.MAIL_USERNAME,
      to: receiverEmail,
      cc: ccedEmail,
      subject: "Email verification for " + receiverEmail,
      html: `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <!-- Approval Card -->
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px; color: black;">Greetings ${username}, and welcome to Cut The Cable entertainment.</p>
            <p style="font-size: 16px; color: black;">Thank you for signing up! Please click the button below to verify your account & complete your signup process:</p>
            <a href="${approvalLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 10px;">Approve</a>
            <p style="margin-top: 20px; color: black;"><strong>Note: After clicking verification you will be redirected to verification page, if verification is successful you will be shown your Username, please keep it safe for Login.</strong></p>
            <p style="font-size: 16px; color: black;">Greetings, and welcome to Cut The Cable entertainment.</p>
            <p style="font-size: 16px; color: black;">Follow these instructions to set up our TV player on your Android FireTV Stick.</p>
            <p style="font-size: 16px; color: black;">1. Enable Developer Options</p>
            <ol style="font-size: 16px; list-style-type: lower-alpha;">
              <li style="color: black;">Click FireTV Stick <strong>Settings</strong></li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/e_improve:outdoor/EnableDevOps1_iqrgsf.jpg" alt="Enable dev ops" width=600 height=350 />
              <br />
              <li style="color: black;">Click <strong>My Fire TV</strong></li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/ClickMyFireTV_dsa9xp.png" alt="Click My Fire TV" width=600 height=350 />
              <br />
              <li style="color: black;">Click <strong>About</strong> (Only if <strong>Developer Options</strong> is not already on this screen)
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/SelectAbout_rku5cn.png" alt="Select about" width=600 height=350 />
              <br />
              <li style="color: black;">Click on <strong>Fire TV Stick</strong> quickly <strong>7</strong> times.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/Click7Times_nxdfcs.png" alt="Click 7 times" width=600 height=350 />
              <br />
              <li style="color: black;">You will see a notification at the bottom saying, "No need you are already a developer."</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288643/Notification_frujci.png" alt="Notification" width=600 height=350 />
              <br />
              <li style="color: black;">Press the back button once or go back to <strong>Settings > My Fire TV</strong> and you will see that Developer options is now available.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288639/DevOpsScreen_t5fdpb.png" alt="Click 7 times" width=600 height=350 />
              <br />
            </ol>
            <p style="font-size: 16px; color: black;">2. Download the CTCTV app</p>
            <ol style="font-size: 16px; list-style-type: lower-alpha;">
              <li style="color: black;">First, get the <strong>Downloader</strong> app. Go to the FireTV Stick home screen, and use the remote to navigate to <strong>Find</strong> on the menu bar.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288643/FindMenu_qklcpt.png" alt="Find Menu" width=600 height=350 />
              <br />
              <li style="color: black;">Type <strong>Downloader</strong> in the search field. When you see <strong>Downloader</strong> in the suggestions list, click on it.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288641/SuggestionList_i3wcbc.png" alt="Suggestion List" width=600 height=350 />
              <br />
              <li style="color: black;">You should see <strong>Downloader</strong> under <strong>APPS & GAMES</strong>. Select it.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288643/GetDownloader_dujjsn.png" alt="Get Downloader" width=600 height=350 />
              <br />
              <li style="color: black;">Click <strong>Get or Download</strong> (You own it) to download and install the app.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/InstallDownloader_jqac8h.png" alt="Install Downloader" width=600 height=350 />
              <br />
              <li style="color: black;">Go back to the home screen and select <strong>Settings > My Fire TV</strong>.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/ClickMyFireTV_dsa9xp.png" alt="Click My Fire TV" width=600 height=350 />
              <br />
              <li style="color: black;">Click on <strong>Developer Options</strong>.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288639/DevOpsScreen_t5fdpb.png" alt="Dev Ops screen" width=600 height=350 />
              <br />
              <li style="color: black;">Select <strong>ADB Debugging</strong> and turn it <strong>ON</strong>.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/ADBDebugging_neyy99.png" alt="ADBDebugging" width=600 height=350 />
              <br />
              <li style="color: black;">Next, select <strong>Install unknown apps</strong>.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288641/UnknownApps_smdd20.png" alt="UnknownApps" width=600 height=350 />
              <br />
              <li style="color: black;">Navigate to <strong>Downloader</strong> and select it to turn it <strong>ON</strong>.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288643/DownloaderUnknown_s3sg3g.png" alt="DownloaderUnknown" width=600 height=350 />
              <br />
              <li style="color: black;">Open the <strong>Downloader</strong> app. If it's the first time, <strong>Allow</strong> to grant permission.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/Allow_rnzbkl.png" alt="Allow" width=600 height=350 />
              <br />
              <li style="color: black;">Click <strong>OK</strong> on the Quick Start Guide pop-up.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288643/QuickStart_px7254.png" alt="QuickStart" width=600 height=350 />
              <br />
              <li style="color: black;">Launch the downloader. Click <strong>Home</strong> on the left sidebar, and then click inside the input text box on the right.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288642/Launch_Downloader_kxvh1z.png" alt="LaunchDownloader" width=600 height=350 />
              <br />
              <li style="color: black;">Enter https://go.aftvnews.com/838009 into the input box. Then click <strong>GO</strong>.</li>
              <br />
              <img src="https://res.cloudinary.com/dvbx1bxjy/image/upload/v1735775873/netgo_link_talmof.png" alt="URLforDownloader" width=600 height=350 />
              <br />
              <li style="color: black;">The download will start. Once it's done, click <strong>Install</strong> on the bottom right.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288639/AfterAppDownloadInstall_v9pbda.png" alt="AfterAppDownloadInstall" width=600 height=350 />
              <br />
              <li style="color: black;">Once the app is installed, you will see a notification confirming the status. You will also see two buttons on the buttom — <strong>Done & Open</strong>. Choose <strong>Done</strong> if you want to open the app later. Choose <strong>Open</strong> to start using the app immediately.</li>
              <br />
              <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288639/DoneOrOpen_pge3v9.png" alt="DoneOrOpen" width=600 height=350 />
              <br />
            </ol>
            <p style="font-size: 16px; color: black;">3. Activate the CTC TV app</p>
            <ol style="font-size: 16px; list-style-type: lower-alpha;">
                <li style="color: black;">When the application opens the activation screen appears. Enter the 3-day free trial code <strong>2162c3620987654</strong> then select <strong>OK</strong>. If <span style="color: red">Not Activated</span> is still showing, click <strong>OK</strong> again.</li>
                <br />
                <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288639/ActivationScreen_rf82x4.png" alt="ActivationScreen" width=600 height=350 />
                <br />
                <li style="color: black;">Next, the <strong>Channel Package</strong> screen will show. Click <strong>Submit</strong> to access all channels. The default parental code is <strong>0000</strong>.</li>
                <br />
                <img src="https://res.cloudinary.com/dpash4vaa/image/upload/v1710288641/ChannelPackage_bnuqof.png" alt="ChannelPackage" width=600 height=350 />
            </ol>
          <p style="font-size: 16px; color: black;">4. That's it! The Electronic Channel Guide will let you navigate the entire system. Enjoy! And thank you!</p>
          <p style="color: black";>CTC</p>
      </div>
      `,
    };

    transporter.sendMail(mail_config, (error, info) => {
      if (error) {
        console.log("error", error);
        return reject({ message: "Error has occurred" });
      }
      return resolve({ message: "Email sent!" });
    });
  });
};



const sendEmail = async (req, res) => {
  const { email, verify_token } = req.params; // Use req.params to access route parameters
  if (!email || !verify_token) {
    console.log("Receiver email or verification token is missing.");
    return res.status(400).json({ message: "Receiver email or verification token is missing." });
  }
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.com", // Replace with the SMTP server for Mail.com
      port: 587, // Common port for SMTP. Use 465 for SSL.
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    const approvalLink = `https://localhost:4242/auth/verifyuser?email=${encodeURIComponent(
      email
    )}&verify_token=${encodeURIComponent(verify_token)}`;

    // <input
    //   type="text"
    //   id="verificationToken"
    //   value="${verify_token}"
    //   readonly
    //   style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ccc; border-radius: 4px;"
    // >


    const mail_config = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Verify your NOCABLESNEEDED Account!",
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">

      <!-- Approval Card -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <p style="font-size: 16px; color: black;">Dear User,</p>
        <p style="font-size: 16px; color: black;">Thank you for signing up! To verify your email address, please click the button below to verify your account & complete your signup process:</p>


        <a href="${approvalLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 10px;">Approve</a>

      </div>
    </div>
      `,
    };

    transporter.sendMail(mail_config, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ message: "Email sent!" });
    });
  } catch (err) {
    console.log("Error sending email", err);
    return res.status(500).json({ message: "Error sending email" });
  }
};


const sendEmails = async (email,BCCemail,message,subject) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.com", // Replace with the SMTP server for Mail.com
      port: 587, // Common port for SMTP. Use 465 for SSL.
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    const mail_config = {
      from: process.env.MAIL_USERNAME,
      to: email,
      bcc: BCCemail,
      subject: subject,
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">

      <!-- message body -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <p style="font-size: 16px; color: black;">Dear User,</p>
        <p style="font-size: 16px; color: black;">${message}</p>
      </div>
    </div>
      `,
    };

    transporter.sendMail(mail_config, (error, info) => {
      if (error) {
        console.log("error", error);
        return reject({ message: "Error has occurred" });
      }
      return resolve({ message: "Email sent!" });
    });
  });
};

const resetPasswordEmail = async (receiverEmail, verify_token) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.com", // Replace with the SMTP server for Mail.com
      port: 587, // Common port for SMTP. Use 465 for SSL.
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    const approvalLink = `http://localhost:4242/auth/api/verify?email=${encodeURIComponent(
      receiverEmail // Use 'email' from route parameters
    )}&verify_token=${encodeURIComponent(verify_token)}`;

    const sendTokenLink = `http://localhost:4242/auth/send-token/${encodeURIComponent(
      receiverEmail
    )}/${encodeURIComponent(verify_token)}`;

    const mail_config = {
      from: process.env.MAIL_USERNAME,
      to: receiverEmail,
      subject: "Password Reset verification for " + receiverEmail,
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">

      <!-- Approval Card -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <p style="font-size: 16px; color: black;">Dear User,</p>
        <p style="font-size: 16px; color: black;">To verify your email address, please copy the referral code below and use it to complete your reset password process:</p>

        <!-- Verification Token Text Box -->
        <input
          type="text"
          id="verificationToken"
          value="${verify_token}"
          readonly
          style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ccc; border-radius: 4px;"
        >

      </div>
    </div>
      `,
    };

    transporter.sendMail(mail_config, (error, info) => {
      if (error) {
        console.log("error", error);
        return reject({ message: "error has occured" });
      }
      return resolve({ message: "Email sent!" });
    });
  });
};

const sendSubscriptionCodes = async (codes, recipientEmail) => {
  let html;
  if (!codes) {
    html = `
      <div>
        <p>no codes available please contact system admin</p>
      </div>
    `
  } else {
     html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <!-- Approval Card -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <p style="font-size: 16px; color: black;">Dear ${recipientEmail},</p>
        <p style="font-size: 16px; color: black;">Thank you for subscribing to Cut The Cable! Please use these codes to start watching:\n${codes.map(obj => obj.code).join('\n')}</p>
      </div>
    </div>`
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.com", // Replace with the SMTP server for Mail.com
    port: 587, // Common port for SMTP. Use 465 for SSL.
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  const ccedEmail = ['cutthecable@techie.com'];

  const mailOptions = {
    from: process.env.MAIL_USERNAME, // Sender address
    to: recipientEmail,
    cc: ccedEmail, // List of recipients
    subject: "Your Digital Subscription To Cut The Cable", // Subject line
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}:`, error);
  }
}


module.exports = { sendEmail, sendTokenEmail, resetPasswordEmail,sendEmails, sendSubscriptionCodes };
