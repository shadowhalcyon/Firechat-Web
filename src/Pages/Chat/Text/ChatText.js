import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { firestore } from 'fire';

import Message from './ChatMessage';
import Spinner from 'Pages/Spinner';

import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function ChatText({ data, selected, loading, setLoading }) {
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState([]);

  const selectedChat = data.chats.find(chat => chat.user === selected);

  useEffect(() => {
    if(selected) setupObserver();
  }, [selected])


  const setupObserver = async () => {
    setChat({ ...chat });
    setLoading(true);
    const observer = firestore.collection("users").doc(data.email).collection("chats").doc(selected).collection("messages").orderBy("timestamp")
    .onSnapshot(messagesData => {

      const messages = [];
      messagesData.forEach(doc => messages.push(doc.data()));
      setMessages(messages);

    });
  }


  useEffect(() => {
    if(chat) {
      const messagesDiv = document.getElementById("messages");
      if(messagesDiv) messagesDiv.scrollIntoView();
    }
  })

  useEffect(() => {
    setLoading(false);
  }, [messages])


  return selected ? (
    <Convo>
      <ChatHeader email={data.email} {...selectedChat} />
      <Messages theme={selectedChat.theme}>
        { !loading ? (messages && messages.map(message => <Message theme={selectedChat.theme} data={data} {...message} />)) : <Box><Spinner color="#377dff" /></Box> }
        <span id="messages"></span>
      </Messages>
      <ChatInput email={data.email} selected={selected} />
    </Convo>
  ) : <Default><h1>Chat with anyone</h1> <Image src={require('img/analysis.svg')} /></Default>
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
