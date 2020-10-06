import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from 'Pages/Chat/Chat';
import Login from 'Pages/Login/Login';

import Spinner from 'Pages/Spinner';

import { auth, firestore } from 'fire';

import { formatText } from 'functions';

function App() {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState();

  useEffect(() => {
    if(user) {
      firestore.collection("users").doc(user.email)
      .onSnapshot(userData => {
        firestore.collection("users").doc(user.email).collection("chats").orderBy("last.timestamp")
        .onSnapshot(chatsData => {

          const chats = [];
          chatsData.forEach(doc => chats.push({ user: doc.id, ...doc.data() }));
          chats.reverse();
          setData({ email: userData.id, ...userData.data(), chats });

        });

      });
    }
  }, [user])

  // auth.signOut();

  return loading || (user && !data)
  ? <Box><Spinner color="#377dff" /></Box>
  : data
    ? <Chat data={data} />
    : <Login />
}

const Box = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App
