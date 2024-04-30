import { motion} from "framer-motion";
import styled from "styled-components";
import ShowCard from "./ShowCard";

const MultipleCard = () => {
  const CardItems = [
    {
      title: "Item 1",
    },
    {
      title: "Item 2",
    },
    {
      title: "Item 2",
    },
    {
      title: "Item 2",
    },
    {

      title: "Item 2",
    },
    {
      title: "Item 1",
    },
    {
      title: "Item 2",
    },
    {
      title: "Item 2",
    },
    {
      title: "Item 2",
    },
  ];
  return (
    <Wrapper>
      {CardItems.map((index) => (
        <motion.div
          className=""
          initial={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 30,
            delay: index * 0.2,
          }}
        >
          <ShowCard />
        </motion.div>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content:space-evenly;
  align-content: center;
  padding-right: 5%;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 850px) {

    width:100%;
    padding-right: 0%;
  }

`;
export default MultipleCard;
