import styled from "styled-components";

const ShowCard = () =>{

    return (
        <Wrapper>
            <img className="Poster" 
            alt="poster"
            src="https://images4.alphacoders.com/866/866285.jpg" />
            <div>
                <p className="Title">Game of Throne</p>
                
                <p className="SubTitle">Drama/Action</p>
            </div>
       
        </Wrapper>
    )

};
const Wrapper = styled.section`

width:225px;
height:190px;
background-color:rgba(187, 67, 77, 0.95);
border-radius:10px;
margin:5%;
margin-right:5%;

.Poster{
  height:65%;
  width:100%;
  border-radius:10px;
  object-fit:cover;
}
.Title{
    color: white;
    margin-top:0;
    padding-left:10px;
    margin-bottom:0px;
    font-size:20px;
    font-weight:100;
}
.SubTitle{
    color: white;
    margin-top:6px;
    padding-left:10px;
    font-weight:100;
}
@media (max-width: 767px) {
    
margin:0%;
margin-bottom:5%;
width:325px;
height:190px;

}
`
export default ShowCard;