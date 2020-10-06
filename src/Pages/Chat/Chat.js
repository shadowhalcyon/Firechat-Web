import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import ChatText from './Text/ChatText'
import ChatList from './List/ChatList'

import { auth, firestore } from 'fire';

function Chat({ data }) {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(selected) firestore.collection("users").doc(data.email).collection("chats").doc(selected).update({ unread: false })
  }, [selected]);

  return (
    <Main>
      <ChatList data={data} selected={selected} loading={loading} setSelected={setSelected} />
      <ChatText data={data} selected={selected} loading={loading} setLoading={setLoading} />
    </Main>
  );
}

const Header = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
`

const Main = styled.main`
  height: 100vh;
  border-top: 1px solid rgb(238, 238, 243);
  display: flex;
`

export default Chat
