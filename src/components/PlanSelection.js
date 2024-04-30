import React from "react";
import styled from "styled-components";
import PentagonIcon from "@mui/icons-material/Pentagon";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PlanSelection = ({ updateSubSecondParentValue }) => {
  function PremiumCardClicked() {
    
    updateSubSecondParentValue(false);
  }
  function StandardCardClicked() {
    updateSubSecondParentValue(false);
  }
  function BasicCardClicked() {
    updateSubSecondParentValue(false);
  }

  return (
    <Wrapper>
      <p className="MainTitleOverlay">Choose your plan.</p>

      <div className="MainHolder">
        <motion.div
          className="OptionCardPremium"
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          onClick={PremiumCardClicked}
        >
          <PentagonIcon className="PriceTag" />
          <p className="PricePremium">$10.00</p>
          <div className="Banner">
            <p className="BannerTitle">Premium</p>
            <p className="BannerSubTitle">4K + HDR</p>
          </div>

          <div className="Option">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Resolution</p>
              <p className="SubTitleFeature">4K(Ultra HD) + HDR</p>
            </div>
          </div>
          <div className="Option">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Video Quality</p>
              <p className="SubTitleFeatureShort">Best</p>
            </div>
          </div>
          <div className="Option">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Supported Devices</p>
              <p className="SubTitleFeature">
                TV, computer, mobile phone, tablet
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="OptionCard"
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          onClick={StandardCardClicked}
        >
          <PentagonIcon className="PriceTagStandard" />
          <p className="PriceStandard">$5.00</p>
          <div className="Banner">
            <p className="BannerTitle">Standard</p>
            <p className="BannerSubTitle">1080p</p>
          </div>

          <div className="OptionStandard">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Resolution</p>
              <p className="SubTitleFeature">1080p (Full HD)</p>
            </div>
          </div>
          <div className="OptionStandard">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Video Quality</p>
              <p className="SubTitleFeatureShort">Better</p>
            </div>
          </div>
          <div className="OptionStandard">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Supported Devices</p>
              <p className="SubTitleFeature">
                TV, computer, mobile phone, tablet
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="OptionCardBasic"
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          onClick={BasicCardClicked}
        >
          <PentagonIcon className="PriceTagBasic" />
          <p className="Price">$2.00</p>
          <div className="Banner">
            <p className="BannerTitle">Basic</p>
            <p className="BannerSubTitle">720p</p>
          </div>

          <div className="OptionBasic">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Resolution</p>
              <p className="SubTitleFeature">720p (HD)</p>
            </div>
          </div>

          <div className="OptionBasic">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Video Quality</p>
              <p className="SubTitleFeatureShort">Good</p>
            </div>
          </div>
          <div className="OptionBasic">
            <div className="TitleHolderFeature">
              <CheckCircleIcon className="TickIcon" />

              <p className="TitleFeature">Supported Devices</p>
              <p className="SubTitleFeature">
                TV, computer, mobile phone, tablet
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  
  .TickIcon {
    color: white;
    font-size: 40px;
    position: absolute;
    left: 5px;
  }
  .TitleHolderFeature {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .TitleFeature {
    text-align: center;
    color: white;
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 0px;
  }
  .SubTitleFeature {
    text-align: center;
    color: white;
    margin-top: 5px;
    margin-left: 20px;
    font-size: 20px;
    font-weight: 600;
  }
  .SubTitleFeatureShort {
    text-align: center;
    color: white;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .Option {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #c01d2f;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    box-shadow: 0 2px 1px rgba(255, 255, 255, 1);
  }
  .OptionBasic {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #05aff2;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    box-shadow: 0 2px 1px rgba(255, 255, 255, 1);
  }
  .OptionStandard {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #22babb;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    box-shadow: 0 2px 1px rgba(255, 255, 255, 1);
  }
  .OptionCard:hover {
    cursor: pointer;
    box-shadow: 0 2px 80px rgba(0, 0, 0, 2);
  }
  .OptionCard:hover .SelectedIconStandard {
    display: flex;
    color: #c9f2f2;
    position: absolute;
    font-size: 200px;
    z-index: 10;
    top: 160px;
    border: 12px;
  }

  .SelectedIconStandard {
    display: none;
  }
  .OptionCard {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    width: 260px;
    height: 500px;
    margin: 10px;
    background: linear-gradient(180deg, #fff 4.02%, #22babb 87.06%);
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 2);
  }
  .OptionCardPremium {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    width: 260px;
    height: 500px;
    margin: 10px;
    background: linear-gradient(180deg, #fff 4.02%, #bf1e2e 87.06%);
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 2);
  }

  .OptionCardPremium:hover {
    cursor: pointer;
    box-shadow: 0 2px 80px rgba(0, 0, 0, 2);
  }
  .OptionCardPremium:hover .SelectedIcon {
    display: flex;
    color: #8c030e;
    position: absolute;
    font-size: 200px;
    z-index: 10;
    top: 160px;
    border: 12px;
  }

  .SelectedIcon {
    display: none;
  }

  .OptionCardBasic {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    width: 260px;
    height: 500px;
    margin: 10px;
    background: linear-gradient(180deg, #fff 4.02%, #05aff2 87.06%);

    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 2);
  }

  .OptionCardBasic:hover {
    cursor: pointer;
    box-shadow: 0 2px 80px rgba(0, 0, 0, 2);
  }

  .OptionCardBasic:hover .SelectedIconBasic {
    display: flex;
    color: #0099dd;
    position: absolute;
    font-size: 200px;
    z-index: 10;
    top: 160px;
    border: 12px;
  }

  .SelectedIconBasic {
    display: none;
  }

  .BannerSubTitle {
    padding-left: 10px;

    font-size: 25px;
    font-weight: 600;
    margin-top: 0;
  }
  .BannerTitle {
    padding-left: 10px;
    font-size: 27px;
    font-weight: 700;
    margin-bottom: 1px;
  }
  .Banner {
    width: 95%;
    height: 30%;
    margin-top: 5px;
    border-radius: 10px;
  }
  .PriceTag {
    color: #c01d2f;
    position: absolute;
    font-size: 130px;
    right: 1px;
    top: 5px;
  }

  .PriceTagBasic {
    color: #05aff2;
    position: absolute;
    font-size: 130px;
    right: 1px;
    top: 5px;
  }
  .PriceTagStandard {
    color: #22babb;
    position: absolute;
    font-size: 130px;
    right: 1px;
    top: 5px;
  }
  .PriceStandard {
    color: white;
    position: absolute;
    font-size: 25px;
    right: 35px;
    top: 20px;
    font-weight: 700;
  }
  .Price {
    color: white;
    position: absolute;
    font-size: 25px;
    right: 35px;
    top: 20px;
    font-weight: 700;
  }
  .PricePremium {
    color: white;
    position: absolute;
    font-size: 25px;
    right: 25px;
    top: 20px;
    font-weight: 700;
  }

  .MainHolder {
    overflowY: auto;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }

  .MainTitleOverlay {
    margin-top: 0px;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: white;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    .MainTitleOverlay {
      font-size: 25px;
    }
    .MainHolder {
      flex-direction: column;
    }
    .OptionCardPremium {
    }
  }

  @media (max-width: 850px) {
    width: 100%;
    margin-left:0%;
    padding-right: 0%;

    .OptionCardBasic{
      width:30%;
      padding:1%;
    }
    .OptionCard{
      width:30%;
      padding:1%;
      
    }
    .OptionCardPremium{
      width:30%;
      padding:1%;
      
    }
    .PriceTagBasic{
      display:none;
    }
    .PriceTagStandard{
      display:none;
    }
    .PriceTag{
      display:none;
    }
    
  }

`;
export default PlanSelection;
