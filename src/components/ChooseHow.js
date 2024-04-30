import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FrequestlyAskedQuestion from "./FrequentlyAskedQuestions";

const ChooseHow = () => {
  return (
    <Wrapper>
      <p className="TvTitle">Choose How You Want to Stream</p>

      <p className="TvSubTitle">
        You can access CatchON TV content exclusively with the CatchON TV app.
        Download for Android tv device or Amazon Fire device.
      </p>
      <img
        className="TVimage"
        src="https://vizivu.site/wp-content/uploads/2023/05/mockup_a87f50a1-7af3-4f99-bb44-aba6c898788d_1280x-768x259.jpg"
      />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 10%;
  background-color: white;

  .TvTitle {
    text-align: center;
    font-size: 50px;
    font-weight:100;
    margin-bottom: 0;
    color: #a6a6a6;
  }
  .divider {
    background: linear-gradient(to top left, #bf3030, white);
  }
  .TvSubTitle {
    text-align: center;
    font-size: 19px;
    font-weight:100;
    margin-top: 0;
    color: #a6a6a6;
  }
  .TVimage {
    width: 50%;
    margin-top: 1%;
  }
  @media (max-width: 767px) {
    .TVimage{
      
    width: 100%;
    }
  }
`;

export default ChooseHow;
