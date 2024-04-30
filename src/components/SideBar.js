
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Troubleshoot } from "@mui/icons-material";

const SideBar = ({ updateParentValue }) => {
  const [UserProfile, setUserProfile] = useState(
    "https://cdn.pixabay.com/photo/2022/04/13/12/14/man-7130170_1280.jpg"
  );

  const UserName = localStorage.getItem("Username");

  const [WatchHistory, setWatchHistory] = useState(true);

  const [ChangePlan, setChangePlan] = useState(false);

  const [UpdateProfile, setUpdateProfile] = useState(false);

  const [RedeemCode, setRedeemCode] = useState(false);


  function WatchHistoryPressed() {
    updateParentValue(1);
    setWatchHistory(true);
    setChangePlan(false);

    setUpdateProfile(false);
    setRedeemCode(false);

    setMenuData(!ShowMenuData);
  }

  function ChangePlanPressed() {
    updateParentValue(2);
    setWatchHistory(false);
    setChangePlan(true);
    setUpdateProfile(false);
    setRedeemCode(false);
    setMenuData(!ShowMenuData);
  }


  function UpdateProfilePressed() {
    updateParentValue(3);
    setWatchHistory(false);
    setChangePlan(false);
    setUpdateProfile(true);
    setRedeemCode(false);
    setMenuData(!ShowMenuData);
  }


  function RedeemCodePressed() {
    updateParentValue(4);
    setWatchHistory(false);
    setChangePlan(false);
    setUpdateProfile(false);
    setRedeemCode(Troubleshoot);
    setMenuData(!ShowMenuData);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuDisplay = document.querySelector('.MenuDisplay');
      const menuIcon = document.querySelector('.menuIcon');

      if (menuDisplay && !menuDisplay.contains(event.target) && menuIcon !== event.target) {
        setMenuData(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const [ShowMenuData, setMenuData] = useState(false);
  function MenuIconClicked() {
    setMenuData(!ShowMenuData);
  }

  const UserImage = localStorage.getItem('ProfilePicture');
  // console.log(UserImage)

  return (
    <Wrapper>
      <div className="SideBarMainDiv">

        {UserImage != "" &&
          <img src={UserImage} alt="User Profile" className="UserImage" />
        }

        {UserImage == "" &&
          <img src={UserProfile} alt="User Profile" className="UserImage" />
        }

        <p className="UserNameText">{UserName}</p>
        <hr className="Divider" />

        <div className="OptionHolder">
          {/* <div className="Option" onClick={WatchHistoryPressed}>
            <p className="OptionText">Watch History</p>
          </div> */}

          <div className="Option" onClick={ChangePlanPressed}>
            <p className="OptionText">Subscriptions</p>
          </div>

          <div className="Option" onClick={UpdateProfilePressed}>
            <p className="OptionText">Update Profile</p>
          </div>
          <div className="Option" onClick={RedeemCodePressed}>
            <p className="OptionText">Redeem Code</p>
          </div>
        </div>
      </div>
      <MoreHorizIcon className="menuIcon" onClick={MenuIconClicked}></MoreHorizIcon>

      {ShowMenuData && (
        <div className="MenuDisplay"
          onBlur={MenuIconClicked}>
          {/* <p className="ButtonText" onClick={WatchHistoryPressed}>Watch History</p> */}
          <p className="ButtonText" onClick={ChangePlanPressed}>Subscriptions</p>
          <p className="ButtonText" onClick={UpdateProfilePressed}>Update Profile</p>
          <p className="ButtonText" onClick={RedeemCodePressed}>Redeem Code</p>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 4.5%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: Center;
  align-content: center;
  border-right: 1px solid rgb(0,0,0,0.1);
  width: 300px;
  
  
  .UserImage {
    height: 150px;
    width: 150px;
    border-radius: 100px;
    margin-top:17%;
    object-fit:cover;
  }
  .menuIcon {
    display: none;
  }
  .UserNameText {
    text-align: center;
    font-size: 22px;
    font-weight: 100;
    color: #1c1f25;
  }
  .Divider {
    opacity: 0.5;
    width: 50%;
    height: 0.2px;
  }
  .OptionText {
    color: #1c1f25;
    text-align: center;
    font-size: 22px;
    font-weight: 100;
  }
  .Option {
    width: 100%;
    margin-top: 50px;
  }
  .Option:hover {
    cursor: pointer;
  }
  .MenuDisplay{
    display:none;    
  }
  @media (max-width: 767px) {
    height: 0px;
    width: 0px;
    .SideBarMainDiv {
      display: none;
    }
    
    .menuIcon {
      display: flex;
      color: #1c1f25;
      font-size: 50px;
      margin-top: auto;
      z-index: 10;
    }
    .MenuDisplay {
      position: absolute;
      height: 250px;
      width: 200px;
      left:10px;
      top:150px;
      background-color: white;
      
      display: flex;
      flex-direction: column;
      align-items: Center;
      align-content: center;
      background-color:#C01D2F;
      border-radius:10px;
      z-index:15;
      
    }
    .ButtonText{
      font-size:20px;
      color: white;
      font-weight:100;
    }
  }

  @media (max-width: 850px) {

    width:45%;
    padding-right: 0%;
    margin-top:15%;
   
  }
`;
export default SideBar;
