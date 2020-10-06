import React, { useState } from 'react';
import styled from 'styled-components';

import { auth, firestore, googleProvider } from 'fire';

function Login() {
  const signInWithGoogle = event => {
    event.preventDefault();
    auth.signInWithPopup(googleProvider)
    .then(data => {
      const { isNewUser, profile } = data.additionalUserInfo;
      const { name, email } = profile;
      if(isNewUser) firestore.collection("users").doc(email).set({ name });
    })
    .catch(error => {
      alert("Error occured: " + error.message);
    })
  }

  return(
    <Box>
      <Button theme="google" onClick={signInWithGoogle}><i className="fa fa-google" /> Sign in with Google </Button>
    </Box>
  )
}

const Box = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  padding: 8px 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  border: none;
  color: white;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  border-radius: 0.25rem;
  background: #DB4437;
  cursor: pointer;
`;

export default Login;
