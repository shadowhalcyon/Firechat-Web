import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Context } from 'context';

import { auth, firestore } from 'fire';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function ChatNew({ data }) {
  const [user, setUser] = useContext(Context);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');


  useEffect(() => {
    if(active) document.getElementById("new").focus();
  }, [active])

  const handleCancel = () => {
    setActive(false);
    setEmail('');
  }

  const handleNew = () => {
    const email1 = email.trim();
    const email2 = user.email.trim();

    const themes = ['purple', 'blue', 'green', 'yellow', 'red'];

    if(email1 === email2) return;
    firestore.collection('users').doc(email1 || ' ').get()
    .then(snapshot => {
      if (snapshot.exists) {
        firestore.collection('users').doc(email1)
        .onSnapshot(doc => {
          const { name, language } = doc.data();
          firestore.collection('users').doc(email1).collection('chats').doc(email2).get()
          .then(snapshot => {
            if(!snapshot.exists) {
              firestore.collection('users').doc(email1).collection('chats').doc(email2).set({
                name: user.name,
                language: 'english',
                theme: themes[Math.floor((Math.random() * 5))],
                unread: false,
                last: {
                  text: '',
                  sender: '',
                  timestamp: ''
                }
              })

              firestore.collection('users').doc(email2).collection('chats').doc(email1).set({
                name,
                language,
                theme: themes[Math.floor((Math.random() * 5))],
                unread: false,
                last: {
                  text: '',
                  sender: '',
                  timestamp: ''
                }
              });

              setActive(false);
              setEmail('');
            } else {
              alert('chat with this user exists');
            }
          });
        });
      } else {
        alert('user does not exist');
      }
    });
  }

  const DEFAULT = (
    <Box onClick={() => setActive(true)}>
      <Icon><i className="fa fa-plus" /></Icon>
      <Info>
        <Name>New Chat</Name>
        <Last>Find users by their email</Last>
      </Info>
    </Box>
  )

  const ACTIVE = (
    <ActiveBox>
      <Input id="new" placeholder="Type email here..." value={email} onChange={e => setEmail(e.target.value)} />
      <Buttons>
        <Button primary onClick={handleNew}> Add </Button>
        <Button onClick={handleCancel}> Cancel </Button>
      </Buttons>
    </ActiveBox>
  )

  return active ? ACTIVE : DEFAULT;
}

const Box = styled.div`
  cursor: pointer;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgb(238, 238, 243);
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;

  ${props => props.current && `background: rgb(0, 0, 0, 0.03);`}
`

const ActiveBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgb(238, 238, 243);
`;

const Info = styled.div`
  padding: 10px;
  width: 100%;
`

const Last = styled.div`
  color: grey;
  font-size: 0.9rem;
  margin-top: 4px;
  overflow: hidden;
  width: 220px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  font-weight: ${props => props.unread && '600'};
`

const Name = styled.div`
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const Icon = styled.div`
  min-height: 45px;
  min-width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1rem;
  color: rgb(0, 0, 0, 0.4);
  background: rgb(0, 0, 0, 0.1);
  border-radius: 100px;
`

const Input = styled.input`
  border: none;
  padding: 10px;
  font-size: 1rem;
  outline: none;

  ::placeholder {
    font-weight: 500;
  }
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 5px;
`;

const Button = styled.button`
  cursor: pointer;
  color: rgb(0, 0, 0, 0.5);
  background: rgb(0, 0, 0, 0.1);
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;

  ${props => props.primary && `
    color: ${colors.green};
    background: rgb(187, 248, 223);
  `};
`;

export default ChatNew;
