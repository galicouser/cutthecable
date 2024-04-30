import styled from "styled-components";
import MultipleCard from "./MultipleCard";

const WatchHistory = () => {

    return (
        <Wrapper>
            <p className="TitleText">Watch History</p>
            <div className="CardsDisplay">
                <MultipleCard />
            </div>
        </Wrapper>
        )
}

const Wrapper = styled.section`
margin-top:4.5%;
background-color: #f9f9f9;
.TitleText{
    color: #1c1f25;
    padding:15px;
    font-weight:100;
    padding-left:105px;
    font-size:35px;
}
.CardsDisplay{
    padding-left:105px;
    margin-top:4%;
}
@media (max-width: 767px) {
   
    
    .TitleText{
        font-size:50px;
        color: #1c1f25;
        padding:0px;
        padding-left:0px;
        text-align:center;
    } 
    .CardsDisplay{
        padding-left:0px;
    }
}
@media (max-width: 1300px) {

    width:100%;
    padding-right: 0%;
    margin-top:15%;
    .CardsDisplay{
        padding-left:1%;
        margin-top:4%;
    }
  }
`
export default WatchHistory;