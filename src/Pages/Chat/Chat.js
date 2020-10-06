import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext, ChatsContext } from 'context';

import ChatText from './Text/ChatText'
import ChatList from './List/ChatList'
import Spinner from 'pages/Spinner';

import { userRef, chatsRef } from 'refs';
import { useDocumentOnce, useCollection } from 'react-firebase-hooks/firestore';

function Chat({ email }) {
  const [user, setUser] = useContext(UserContext);
  const [chats, setChats] = useContext(ChatsContext);

  const [userData, userDataLoading] = useDocumentOnce(userRef(email));
  const [chatsData, chatsDataLoading] = useCollection(chatsRef(email));

  useEffect(() => {
    if(userData) {
      const { id: email } = userData;
      const { name, language } = userData.data();
      setUser({ name, email, language });
    }
  }, [userData]);

  useEffect(() => {
    if(chatsData) {
      const chats = [];
      chatsData.forEach(doc => chats.push({ user: doc.id, ...doc.data() }));
      chats.reverse();
      setChats(chats);
    }
  }, [chatsData]);

  return (user && chats) ? (
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
