import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { uploadImage } from "../APIs/config";
import { updateProfilePicture } from "../APIs/authAPI";
const UpdateProfile = () => {
  const [UserProfile, setUserProfile] = useState(
    localStorage.getItem('ProfilePicture')
  );

  const [FirstName, setFirstName] = useState("")

  const [LastName, setLastName] = useState("")

  const [DateOfBirth, setDateOfBirth] = useState("")

  const [firebaseURL, setFirebaseURL] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(reader.result);
        localStorage.setItem("ProfilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (file) {
      setLoading(true);
      const extension = file.name.split(".").pop();

      uploadImage(file, extension, (progress) => {
        const numericProgress = parseFloat(progress);
        console.log(`Upload progress: ${numericProgress}%`);
      })
        .then((downloadUrl) => {
          console.log("Download URL:", downloadUrl.url);
          setFirebaseURL(downloadUrl)
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        });
    }
  };


  const handleSaveChange = async () => {
    const UserName = localStorage.getItem("Username");
    console.log(firebaseURL)
    const user = await updateProfilePicture(UserName, firebaseURL.url);
    console.log(user);
  };


  return (
    <Wrapper>
      {loading && (
        <div className="Loader">
          <div className="Spinner" />
          Uploading...
        </div>
      )}
      <p className="Title">Update Profile</p>
      <Grid container gap={2} className="MainGrid">
        <Grid item lg={2}>
          <div className="ImageHolder">
            <img src={UserProfile} alt="User Profile" className="UserImage" />
          </div>
        </Grid>
        <Grid item lg={2}>
          <div>
            <Grid container gap={2} className="SubGrid">
              <Grid item lg={12}>
                <div>
                  <Button className="Button" variant="text">
                    <RemoveRedEyeIcon className="Icon" /> View Profile
                  </Button>
                </div>
              </Grid>
              <Grid item lg={12}>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <Button className="Button" variant="text" onClick={() => {
                    fileInputRef.current.click()
                  }
                  }
                  >
                    <ChangeCircleIcon className="Icon" /> Change Profile
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Grid container gap={2} className="SubGrid">
        <Grid item lg={4.13}>
          <div>
            <p className="PromptTextMain">
              Please upload an image smaller than 2MB.
            </p>
          </div>
        </Grid>
      </Grid>

      {/* <Grid container gap={2} className="SubGrid">
        <Grid item lg={3}>
          <div>
            <p className="PromptText">
              First Name
            </p>

            <input
              className={"InputFieldGeneral"}
              type="text"
              value={FirstName}
              onChange={handleFirstNameChange}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container gap={2} className="SubGrid">
        <Grid item lg={3}>
          <div>
            <p className="PromptText">
              Last Name
            </p>

            <input
              className={"InputFieldGeneral"}
              type="text"
              value={LastName}
              onChange={handleLastNameChange}
            />
          </div>
        </Grid>
      </Grid> */}
      {/* <Grid container gap={2} className="SubGrid">
        <Grid item lg={3}>
          <div>
            <p className="PromptText">
              Date of Birth
            </p>

            <input
              className={"InputFieldGeneral"}
              type="text"
              value={DateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </div>

        </Grid>

      </Grid> */}

      <Grid container gap={2} className="SubGrid">
        <Grid item lg={3}>

          <Button
            variant="contained"
            className="ColoredButton"
            onClick={handleSaveChange}
          >
            Save Change
          </Button>

        </Grid>

      </Grid>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 5%;
  width: 95%;
  height: 100%;



  .Loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .Spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }



.MainGrid{
  display: flex;

    justify-content: center;
    align-content: center;
    align-items: center;
}
.SubGrid{
  display: flex;

    justify-content: center;
    align-content: center;
    align-items: center;
}
  .Button {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 10%;
    margin-bottom: 2%;
    color: grey;
    font-size: 15px;
  }
  .ColoredButton {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 10%;
    margin-bottom: 2%;
    color: grey;
    font-size: 15px;
    background-color: #bb434d;
    color:white;
  }

  .ColoredButton:hover {
    color:black;
  }


  .InputFieldGeneral {
    width: 100%;
    height: 45px;
    margin-top: 0;
    border-radius: 5px;
    font-size: 18px;
    outline:none;
    border:none;
    background-color:#E9ECF2;
  }


  .PromptText {
    font-size: 17px;
    font-weight: 400;
    color: grey;
  }
  .PromptTextMain{
    font-size: 17px;
    font-weight: 400;
    color: grey;
    text-align:center;
  }

  .Icon {
    padding-right: 5%;
  }

  .ImageHolder {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .UserImage {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }

  .Title {
    color: #1c1f25;
    padding:15px;
    font-weight:100;
    padding-left:105px;
    font-size:35px;
  }
  @media (min-width: 800px) and (max-width: 950px) {
    margin-top: 15%;
  }
  @media (max-width: 767px) {
    padding-left: 0%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;
    align-items:center;
    .MainGrid{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;
    align-items:center;
    }
    .SubGrid{
      display:flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;
    align-items:center;
    }
    .Title {
      margin-left:0px;
    }
  }




`;
export default UpdateProfile;
