import { React } from "react";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

const ResetPasswordDone = ({ updateResetDoneParentValue }) => {
  

    const handleButtonClick = (selectedFunction) => {
        updateResetDoneParentValue(selectedFunction);
      };

      function DoneClicked (){
        handleButtonClick("functionOne")
      }
       
  return (
    <Wrapper>
     <CheckCircleIcon className="TickIcon"/>
     <p className="Text">Password Reset Successfully!</p>

     <Button
        variant="contained"
        onClick={DoneClicked}
        className="FinalButton"
        style={{ textTransform: "none" }}
      
      >
        <p className="SignUpText">Done</p>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
align-content:center;
.Text{
    font-size:30px;
    color:white;
    font-weight:700;
    text-align:center;
}
.TickIcon{
    font-size:150px;
    margin-top:20%;
    color:white;
}
.FinalButton {
    background-color: #BB434D;
    width: 200px;
    height:55px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5%;
  }
  .FinalButton:hover {
   cursor:pointer;
}
@media (max-width: 767px) {

  .TickIcon{
    font-size:50px;
    margin-top:5%;
  }
  .Text{
    font-size:22px;
   
}
}
  
`;
export default ResetPasswordDone;
