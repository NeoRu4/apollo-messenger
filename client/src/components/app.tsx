import React from "react";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { MessageHeader } from "./message-header";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
`;

export const App = () => {
  return (
    <Wrapper>
      <MessageHeader />
      <MessageList />
      <MessageInput />
    </Wrapper>
  );
};
