import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  h3 {
    margin: 0;
  }
`;

export const MessageHeader = () => {
  return (
    <Wrapper>
      <h3>Сообщения</h3>
    </Wrapper>
  );
};
