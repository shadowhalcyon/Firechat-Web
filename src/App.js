import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { auth } from 'fire';
import { useAuthState } from 'react-firebase-hooks/auth';

import Chat from 'pages/Chat/Chat';
import Login from 'pages/Login/Login';
import Spinner from 'pages/Spinner';

function App() {
  const [cred, loading] = useAuthState(auth);

  return loading
  ? <Box><Spinner color="#377dff" /></Box>
  : cred
    ? <Chat email={cred.email} />
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
