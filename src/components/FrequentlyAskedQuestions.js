import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const FrequestlyAskedQuestion = () => {
  const [QuestionCard, setQuestionCard] = useState(true);
  const [QuestionCard2, setQuestionCard2] = useState(true);

  const backgroundChange = () => {
    if (window.scrollY >= 1900) {
      setQuestionCard(true);
    }
    if (window.scrollY >= 2000) {
      setQuestionCard2(true);
    }
  };
  window.addEventListener("scroll", backgroundChange);

  useEffect(() => {
    // Machinism for checking if Application is opened on a Mobile Phone
    const isMobile = /Mobi/i.test(navigator.userAgent);
    if (isMobile) {
      setQuestionCard(true);
      setQuestionCard2(true);
    }
  }, []);

  return (
    <Wrapper>
      <p className="TvTitle2">Frequenty Asked Questions</p>

      <p className="TvSubTitle2">
        Answers to some of the most common questions.
      </p>

      <div className="QuestionCardOuter">
        <div className="QuestionAnswerHolder">
          <motion.div
            initial={{ opacity: 0.5, translateX: -100 }}
            animate={QuestionCard ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 1, delay: 5 * 0.5 }}
            className={QuestionCard ? "QuestionCard" : "displayNone"}
          >
            <p className="question">How to get CatchON TV ?</p>
            <p className="answer">
              In order to get an access plan, contact Vizivu via the contact
              page, and you will be provided the appropriate information.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.5, translateX: -100 }}
            animate={QuestionCard ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 1, delay: 5 * 0.5 }}
            className={QuestionCard ? "QuestionCard" : "displayNone"}
          >
            <p className="question">
              Can I sign in to a billing account with CatchON TV?
            </p>
            <p className="answer">
              No there is no billing or user account to sign in to. There is no
              need for it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.5, translateX: -100 }}
            animate={QuestionCard ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 1, delay: 5 * 0.5 }}
            className={QuestionCard ? "QuestionCard" : "displayNone"}
          >
            <p className="question">Does it work with any other apps?</p>
            <p className="answer">
              No CatchON TV App is the only player this service works with.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="QuestionCardOuter">
        <div className="QuestionAnswerHolder2">
          <motion.div
            initial={{ opacity: 0.5, translateX: 100 }}
            animate={QuestionCard2 ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 1, delay: 5 * 0.5 }}
            className={QuestionCard2 ? "QuestionCard" : "displayNone"}
          >
            <p className="question">Do you offer indepth tech support?</p>
            <p className="answer">
              We basic tech support as each device is different. We suggest
              utilizing the manufacturer or our online video tutorials to
              troubleshoot minor issues and to discover options to help you get
              the most out of this offering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.5, translateX: 100 }}
            animate={QuestionCard2 ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 1, delay: 5 * 0.5 }}
            className={QuestionCard2 ? "QuestionCard" : "displayNone"}
          >
            <p className="question">What kind of devices can I use to watch?</p>
            <p className="answer">
              We suggest Android media devices with minimum 2GB RAM – 4GB
              Storage – 100Mbps, Amazon Fire Stick, or any Android based device
              box and smartphone with the minimum specs as mentioned above.
            </p>
          </motion.div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  background-color:white ;
  .LandingImage {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
  }

.TvTitle2 {
    margin-top: 10%;
    text-align: center;
    font-size: 45px;
    font-weight:100;
    margin-bottom: 0;
    color: #a6a6a6;
  }
  .displayNone{
    display:none;
  }
  .QuestionAnswerHolder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 75%;
  }
  .QuestionCard {
    margin-right: 2.5%;
    width: 30%;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 5px;

    display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  }
 
  .QuestionAnswerHolder2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 75%;
  }

  .TvSubTitle2 {
    text-align: center;
    font-size: 17px;
    margin-top: 0;
    color: #a6a6a6;
    font-weight:100;
  }

  .QuestionCardOuter {
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }

  .question {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #6e6f73;
    font-weight:150;
  }
  .answer {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color: #6e6f73;
    margin-top:2.5%;
    font-weight:100;
  }
 

  //SMALL DEVICES MEDIA QUERY
  @media (max-width: 767px) {
    .QuestionCardOuter {
     flex-direction:column;
     justify-content: center;
     align-items:center;
     align-content:center;
    }
    .QuestionAnswerHolder{
      flex-direction: column;
      
     justify-content: center;
     align-items:center;
     align-content:center;
      width:100%;
    }
    .QuestionAnswerHolder2{
      flex-direction: column;
      
      justify-content: center;
      align-items:center;
      align-content:center;
       width:100%;
    }
    .QuestionCard{
      width:75%;
      margin-bottom:0px; 
      margin-top:0px;
      height:200px;
    } 
    .answer{
      margin-top:0px;
    }
    .TopText {
      font-size: 18px; 
    }
    .LightEffect2{
      display:none;
    }
    .LightEffect{
      display:none;
    }
    .IconCardHolder {
     flex-direction:column;
     justify-content:center;
     align-content:center;
     width:100%;
    } 
    .MainImage{
      height:180px;
    }
    .ImageTextHolder {
      width:100%
      display: flex;
      flex-direction:column;
    }
    .ImageHolder {
      width: 100%;
    }
    .ImageHolder2 {
      display:none;
    }
    .MobileImage{
      display:flex;
    }
      }
  `;
export default FrequestlyAskedQuestion;
