import React, { useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { MessageType } from "../types/message.type";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: 10px 0;
`;

const Prefix = styled.span`
  color: #6200ff;
  font-weight: 700;
`;

const Message = styled.div`
   margin: 5px;
`;


const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
    }
  }
`;
const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageAdded {
    messageAdded {
      id
      text
    }
  }
`;
export const MessageList = () => {
    const list = useRef<HTMLDivElement>(null);

    const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);

    const subscribeToNewComments = () => subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
                return prev;
            }
            return Object.assign({}, prev, {
                messages: [
                    ...prev.messages,
                    subscriptionData.data.messageAdded,
                ],
            });
        },
    });

    useEffect(() => {
        const messageList = list.current;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
        let unsub = subscribeToNewComments();
        return () => {
            unsub();
        };
    });

    if (loading) {
        return <Wrapper>Loading...</Wrapper>;
    }
    if (error) {
        return <Wrapper>Error :(</Wrapper>;
    }

    return (
        <Wrapper ref={list}>
            {data.messages.map((message: MessageType, index: number) => (
                <Message key={`message-${index}`}><Prefix>{">"}</Prefix> {message.text}</Message>
            ))}
        </Wrapper>
    );
};
