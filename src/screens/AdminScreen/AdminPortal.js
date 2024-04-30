import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBarAdmin from "../../components/AdminPortalComponents/SideBarAdmin";
import UserList from "../../components/AdminPortalComponents/UserList";
import Users from "../../components/AdminPortalComponents/Users";
import Plans from "../../components/AdminPortalComponents/Plans";
import CreateRedeemCode from "../../components/AdminPortalComponents/CreateRedeemCode";
import AllocateRedeemCode from "../../components/AdminPortalComponents/AllocateRedeemCode";
import { useNavigate } from "react-router-dom";


const AdminPortal = () => {
  const [CurrentScreen, setCurrentScreen] = useState(4);
  const signedInUser = localStorage.getItem("Username");
  const navigate = useNavigate();

  const handleValueUpdate = (newValue) => {
    setCurrentScreen(newValue);
  };

  useEffect(() => {
    if (signedInUser === null) {
      navigate('/');
    }
  }, []);

  function ScreenDisplay() {
    // alert(CurrentScreen)
    if (CurrentScreen === 1) {
      return <UserList />;
    }
    if (CurrentScreen === 2) {
      return <CreateRedeemCode />;
    }
    if (CurrentScreen === 3) {
      return <AllocateRedeemCode />;
    }
    if (CurrentScreen === 4) {
      return <Users />;
    }
    if (CurrentScreen === 5) {
      return <Plans />;
    }
  }
  return (
    <Wrapper>
      <Header />
      <div className="FlexRowDiv">
        <SideBarAdmin updateParentValue={handleValueUpdate} />
        {ScreenDisplay()}
      </div>

      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section`

  background-color: #f9f9f9;


  .FlexRowDiv {
    display: flex;
    flex-direction: row;
  }
  .SignInPrompt {
    position: absolute;
    right: 50px;
    top: 85px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
  }
  .PromptText {
    font-size: 22px;
    color: white;
    margin-top: 0px;
    font-weight: 700;
    margin-bottom: 11px;
  }
  .PromptTextSub {
    font-size: 18px;
    color: white;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 100;
    padding: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;

    background-color: #1d0e47;
  }
  .PromptTextSub:hover {
    background-color: #1d0e47;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    .FlexRowDiv {
      display: flex;
      flex-direction: column;
    }
    .PromptText{
      display:none;
    }
    .PromptTextSub{
       font-size:15px;
       margin-top:30px;
    }
    .SignInPrompt{
      right:10px;
      top:85px;
      padding:0px;
    }
  }
`;
export default AdminPortal;
