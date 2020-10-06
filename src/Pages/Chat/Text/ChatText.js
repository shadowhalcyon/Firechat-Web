import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from 'context';

import Message from './ChatMessage';
import Spinner from 'pages/Spinner';

import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

import { messagesRef } from 'refs';
import { useCollection } from 'react-firebase-hooks/firestore';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function ChatText() {
  const [user, setUser] = useContext(Context);
  const [messageData, messageDataLoading] = useCollection(messagesRef(user.email, user.selected));
  const [messages, setMessages] = useState();

  useEffect(() => {
    if(user.selected && messageData) {
      const messages = [];
      messageData.forEach(doc => messages.push(doc.data()));
      setMessages(messages);
    }
  }, [user.selected, messageData])

  const selectedChat = user.chats.find(chat => chat.user === user.selected);

  useEffect(() => {
    if(selectedChat) {
      const messagesDiv = document.getElementById("messages");
      if(messagesDiv) messagesDiv.scrollIntoView();
    }
  })


  return user.selected ? (
    <Convo>
      <ChatHeader email={user.email} {...selectedChat} />
      <Messages theme={selectedChat.theme}>
        { !messageDataLoading ? (messages && messages.map(message => <Message theme={selectedChat.theme} email={user.email} {...message} />)) : <Box><Spinner color="#377dff" /></Box> }
        <span id="messages"></span>
      </Messages>
      <ChatInput email={user.email} selected={user.selected} />
    </Convo>
  ) : <Default><h1>Chat with anyone</h1> <Image src={require('images/analysis.svg')} /></Default>
}

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Default = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 50%;
`;

const Convo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-template-rows: 57px 1fr 81px;
  width: 100%;
`

const Messages = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  // background: ${props => colors[props.theme]};
  background: white;
`

const Time = styled.span`
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  // position: absolute;
  float: right;
  right: 4px;
  bottom: 4px;
`


export default ChatText;
