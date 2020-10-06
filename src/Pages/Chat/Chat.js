import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Context } from 'context';

import ChatText from './Text/ChatText'
import ChatList from './List/ChatList'
import Spinner from 'pages/Spinner';

import { userRef, chatRef, chatsRef } from 'refs';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';

function Chat({ email }) {
  const [user, setUser] = useContext(Context);
  const [userData, userDataLoading] = useDocument(userRef(email));
  const [chatsData, chatsDataLoading] = useCollection(chatsRef(email));

  useEffect(() => {
    if(user && user.selected) chatRef(user.email, user.selected).update({ unread: false })
  }, [user]);

  useEffect(() => {
    if(userData) {
      const { id: email } = userData;
      const { name, language } = userData.data();
      setUser({ ...user, name, email, language });
    }
  }, [userData])

  useEffect(() => {
    if(chatsData) {
      const chats = [];
      chatsData.forEach(doc => chats.push({ user: doc.id, ...doc.data() }));
      chats.reverse();
      setUser({ ...user, chats });
    }
  }, [chatsData])

  return (user && user.chats) ? (
    <Main>
      <ChatList />
      <ChatText />
    </Main>
  ) : (
    <Box><Spinner color="#377dff" /></Box>
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

const Box = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default Chat
