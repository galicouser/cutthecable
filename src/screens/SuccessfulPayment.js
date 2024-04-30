import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FrequestlyAskedQuestion from "../components/FrequentlyAskedQuestions";

const SuccessfulPayment = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate("/");

            return () => clearTimeout(timeoutId);
        }, 4000);})

        return (
            <Wrapper>
                <motion.div
                    initial={{ opacity: 0.5, translateY: 500 }}
                    animate={true ? { opacity: 1, translateY: 0 } : {}}
                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                    className={"TvDisplayMain"}
                >

                    <p className="TvTitle">
                        Congratulations! Your Payment was successful.
                    </p>

                    <p className="TvSubTitle">
                        Experience the ultimate in home entertainment with Nocableneeded
                    </p>


                    <hr className="divider" style={{ width: '75%', height: '5px', marginTop: "7.5%", opacity: "1000%", marginBottom: 0, border: 'none' }} />

                </motion.div>
            </Wrapper>
        )
    }

const Wrapper = styled.section`

.TvDisplayMain {
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-top: 0%;
  }
  .TVimage {
    width: 100%;
    margin-top:10%;
  }
  .TvSubTitle {
    text-align: center;
    font-size: 18px;
    margin-top: 0;
    color: #a6a6a6;
    
    font-weight: 100;
  }
  .TvTitle {
    text-align: center;
    font-size: 50px;
    font-weight: 100;
    margin-bottom: 0;
    color: #a6a6a6;
  }

  .mainButtonHolder {
     
    flex-direction: column;
    justify-content: center;
    align-content:center;
    align-items:center;
    width: 100%;
  }
  .TvButtonHolder {
  
    width: 75%;
    margin-top: 10px;
  }
  .ButtonText {
    padding: 0 20px;
    font-size: 15px;
    font-weight: 100;
    color: white;
    text-align:center;
  }
  .divider{
    background: linear-gradient(to top left, #bf3030, white);
  }

  `
    export default SuccessfulPayment;