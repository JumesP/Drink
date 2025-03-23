import React from "react";
import styled from "styled-components";
import Result from "../Result/index.jsx";

const ResultContainer = ({ results }) => {
  const StyledResultContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 10px;
    padding: 10px;
    width: fit-content;
  `;

  const StyledParentResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid black;
    border-radius: 5px;
  `;


  return (
      <StyledParentResultContainer>
        <h2>Results</h2>
        <StyledResultContainer>
          {results.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </StyledResultContainer>
      </StyledParentResultContainer>
  );
};

export default ResultContainer;