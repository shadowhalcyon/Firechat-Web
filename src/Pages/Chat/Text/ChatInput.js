import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from 'context';

import { firestore } from 'fire';
import * as firebase from 'firebase/app'

function ChatInput({ email }) {
  const [input, setInput] = useState('');
  const [user, setUser] = useContext(Context);

  const handleEnterClick = event => {
    if(event.keyCode === 13) handleSendMessage();
  }

  useEffect(() => {
    setInput('');
  }, [user.selected])

  const handleSendMessage = () => {
    if(!input) return;

    const message = {
      text: input.trim(),
      sender: email,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    }

    firestore.collection("users").doc(user.selected).collection("chats").doc(email).update({
      unread: true,
      last: message,
      messages: []
    })

    firestore.collection("users").doc(email).collection("chats").doc(user.selected).update({
      unread: false,
      last: message,
      messages: []
    })

    firestore.collection("users").doc(user.selected).collection("chats").doc(email).collection("messages").add(message);
    firestore.collection("users").doc(email).collection("chats").doc(user.selected).collection("messages").add(message);

    setInput('')
  }

  return (
    <Footer>
      <Type placeholder="Type your message here..." value={input} onKeyUp={handleEnterClick} onChange={e => setInput(e.target.value)} />
      <Send className="fa fa-paper-plane" onClick={handleSendMessage} />
    </Footer>
  )
}

const Footer = styled.div`
  padding: 19.5px;
  background: rgb(0, 0, 0, 0.03);
  border-top: 1px solid rgb(238, 238, 243);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const Send = styled.button`
  border: none;
  font-size: 0.9rem;
  height: 30px;
  width: 30px;
  outline: none;
  border-radius: 100px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    margin-top: 2px;
    margin-right: 2px;
  }

  color: grey;
  background: transparent;

  &:hover {
    color: #377dff;
    background: rgb(55, 125, 255, 0.2);
  }

  position: absolute;
  right: 23px;
`

const Type = styled.input`
  width: 100%;
  font-size: 0.9rem;
  padding: 10px 15px;
  padding-right: 40px;
  background: rgb(0, 0, 0, 0.04);
  border: none;
  border-radius: 100px;
  border: 1px solid rgb(238, 238, 243);
  outline: none;
  ::placeholder {
    color: grey;
  }

  &:focus + ${Send} {
    color: #377dff;
  }
`

export default ChatInput;
