import React, { useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { MessageType } from "../types/message.type";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: 10px 0;
`;

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
    }
  }
`;

export const MessageList = () => {
  const list = useRef<HTMLDivElement>(null);

  const { loading, error, data } = useQuery(GET_MESSAGES);

  useEffect(() => {
    const messageList = list.current;
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
  });

  if (loading) return <Wrapper>Loading...</Wrapper>;
  if (error) return <Wrapper>Error :(</Wrapper>;

  return (
    <Wrapper ref={list}>
      {data.messages.map((message: MessageType, index: number) => (
        <div key={`message-${index}`}>{message.text}</div>
      ))}
    </Wrapper>
  );
};
