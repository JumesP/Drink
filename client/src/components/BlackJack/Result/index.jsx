import React from "react";
import styled from "styled-components";

const Result = ({ result }) => {
  if (!result) {
    return null; // or return a default UI
  }

  const { player, drinks } = result;

  const StyledResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 200px;
    background-color: ${({ drinks }) =>
      drinks > 0 ? 'green' : drinks < 0 ? 'red' : 'grey'};
  `;

  const StyledPlayer = styled.div`
    font-size: 32px;
  `;

  const StyledDrinks = styled.div`
    font-size: 20px;
  `;

  return (
    <StyledResult drinks={drinks}>
      <StyledPlayer>{player}</StyledPlayer>
      <StyledDrinks>{drinks} Drinks</StyledDrinks>
    </StyledResult>
  );
};

export default Result;