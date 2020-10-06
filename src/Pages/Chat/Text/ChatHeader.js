import React from 'react';
import styled from 'styled-components';

import { firestore } from 'fire';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function ChatHeader({ email, language, name, user, theme }) {

  const themes = ['purple', 'blue', 'green', 'yellow', 'red'];

  const handleSetTheme = color => {
    firestore.collection("users").doc(email).collection("chats").doc(user).update({
      theme: color
    })
  }

  return (
    <Header>
      <Contact>
        <Flag src={require('img/flags/us.svg')} />
        <Name>{ name }</Name>
      </Contact>
      <Theme>
        { themes.map(color => <Color name={color} selected={color === theme} onClick={() => handleSetTheme(color)} />) }
      </Theme>
    </Header>
  )
}

const Header = styled.div`
  padding: 15px 25px;
  background: rgb(0, 0, 0, 0.03);
  border-bottom: 1px solid rgb(238, 238, 243);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Contact = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`

const Flag = styled.img`
  height: 24px;
  margin-right: 15px;
`

const Theme = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 6px;
`

const Color = styled.div`
  ${props => {
    return props.selected
    ? `
      background: ${colors[props.name]};
      border: 4px solid ${colors[props.name]};
    `
    : `
      border: 4px solid ${colors[props.name]};
    `
  }}

  cursor: pointer;
  border-radius: 100px;
  height: 20px;
  width: 20px;
`

export default ChatHeader;
