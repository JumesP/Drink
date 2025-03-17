import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: blue;
`;

const Page = ({ children }) => {
  return (
    <StyledPage>
      {children}
    </StyledPage>
  );
}

export default Page;