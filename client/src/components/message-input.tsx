import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;
const Input = styled.input`
  resize: none;
  flex-grow: 1;
  border-radius: 2px;
  border: 1px solid #212121;
  outline: 0;
  margin: 0 15px 0 0;
  padding: 10px;
  height: 38px;
  color: #212121;
  font-size: 14px;
  font-weight: normal;
`;
const Button = styled.button`
  border-radius: 2px;
  border: 0;
  outline: 0;
  margin: 0;
  padding: 10px 25px;
  height: 38px;
  background-color: #2196f3;
  color: #fcfcfc;
  font-size: 14px;
  font-weight: bold;
`;

const SET_MESSAGE = gql`
  mutation SendMessage($message: MessageInput) {
    message(message: $message) {
      id
      text
    }
  }
`;

export const MessageInput = () => {
  const sendButton = useRef<HTMLButtonElement>(null);

  const [message, setMessage] = useState<string>("");

  const [sendMessage] = useMutation(SET_MESSAGE);

  const handleSend = () => {
    sendMessage({
      variables: {
        message: {
          text: message,
        },
      },
    })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Wrapper>
      <Input
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendButton.current?.click();
          }
        }}
      />
      <Button ref={sendButton} onClick={handleSend}>
        Отправить
      </Button>
    </Wrapper>
  );
};
