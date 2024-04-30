import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import React, { useState } from "react";
import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const SideBarAdmin = ({ updateParentValue }) => {

  const [UserProfile, setUserProfile] = useState(
    "https://cdn.pixabay.com/photo/2022/04/13/12/14/man-7130170_1280.jpg"
  );
  const [UserName, setUserName] = useState("Admin");

  const [WatchHistory, setWatchHistory] = useState(true);

  const [ChangePlan, setChangePlan] = useState(false);

  const [EditProfile, setEditProfile] = useState(false);

  function Plans() {
    updateParentValue(5);
    setWatchHistory(true);
  }
  function Users() {
    updateParentValue(4);
    setWatchHistory(true);
  }
  function CreateRedeemCode() {
    updateParentValue(2);
    setWatchHistory(true);
  }
  function ViewRedeemCodes (){
    updateParentValue(1);
    setWatchHistory(true);
  }
  function AllocateRedeemCode (){
    updateParentValue(3);
    setWatchHistory(true);
  }



  const [ShowMenuData, setMenuData] = useState(false);
  function MenuIconClicked() {
    setMenuData(!ShowMenuData);
  }
  return (
    <Wrapper>
      <div className="SideBarMainDiv">
        <p className="UserNameText">{UserName}</p>
        <hr className="Divider" />

        <div className="OptionHolder">
          <div className="Option" onClick={Plans}>
            <p className="OptionText">Plans</p>
          </div>
          <div className="Option" onClick={Users}>
            <p className="OptionText">Users</p>
          </div>
          <div className="Option" onClick={CreateRedeemCode}>
            <p className="OptionText">Create Prepay Code</p>
          </div>

          <div className="Option" onClick={ViewRedeemCodes}>
          <p className="OptionText">Redeemable Prepay Codes</p>
          </div>

          {/* <div className="Option" onClick={AllocateRedeemCode}>
          <p className="OptionText">Assign Code To User</p>
          </div> */}

        
           
        </div>
      </div>
      <MoreHorizIcon className="menuIcon" onClick={MenuIconClicked}></MoreHorizIcon>

      {ShowMenuData && (
        <div className="MenuDisplay">
        <p className="ButtonText" onClick={Plans}>Plans</p>
          <p className="ButtonText" onClick={Users}>Users</p>
          <p className="ButtonText" onClick={CreateRedeemCode}>Create Subscription Code</p>
          <p className="ButtonText" onClick={ViewRedeemCodes}>Redeemable Subscription Codes</p>
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
    margin-top: 20px;
  }
  .menuIcon {
    display: none;
  }
  .UserNameText {
    text-align: center;
    font-size: 22px;
    font-weight: 100;
    color: #1c1f25;
    margin-top:30%;
  }
  .Divider {
    opacity: 0.5;
    width: 50%;
    height: 0.2px;
  }
  .OptionText {
    color: #1c1f25;
    text-align: center;
    font-size: 20px;
    font-weight: 100;
  }
  .Option {
    width: 100%;
    margin-top: 50px;
  }
  .Option:hover {
    cursor: pointer;
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
      margin-left: 100px;
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
      margin: auto;
      
      display: flex;
      flex-direction: column;
      align-items: Center;
      align-content: center;
      background-color:#1D0E47;
      border-radius:10px;
      z-index:15;
      
    }
    .ButtonText{
      font-size:20px;
      color:white;
      font-weight:100;
      text-align: center;
    }
  }
`;
export default SideBarAdmin;
