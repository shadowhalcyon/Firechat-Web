import React from 'react';
import styled from 'styled-components';

import { formatTime, formatText } from 'functions';

const colors = {
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  red: 'rgb(227, 119, 129)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)',
}

function ChatItem({ user, name, last, theme, unread, active, ...rest }) {
  const initials = name && name.split(' ').map(word => word[0].toUpperCase());
  const UNREAD = unread && <Unread className="fa fa-circle"></Unread>

  const time = formatTime(last.timestamp);

  return (
    <Box active={active} {...rest}>
      <Icon theme={theme}>{ initials }</Icon>
      <Info>
        <Main>
          <Name> {name} </Name> { UNREAD }
          <Date>{ time }</Date>
        </Main>
        {
          last.text
          ? <Last theme={theme} dangerouslySetInnerHTML={{ __html: formatText(last.text) }}></Last>
          : <Last><i>Start your new chat from here</i></Last>
        }
      </Info>
    </Box>
  )
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

  ${props => props.active && `background: rgb(0, 0, 0, 0.03);`}
`

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

const Main = styled.div`
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`

const Name = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const Unread = styled.span`
  color: #377dff;
  font-size: 0.5rem;
  margin: 0 5px;
`

const Date = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  color: darkgrey;
`

const Icon = styled.div`
  min-height: 45px;
  min-width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1rem;
  background: rgb(200, 200, 200);
  border-radius: 100px;
  background: rgb(187, 248, 223);
  color: rgb(40, 162, 111);

  color: ${props => colors[props.theme]};

  background: ${props => {
    switch(props.theme) {
      case 'green': return 'rgb(187, 248, 223)'
      case 'blue': return 'rgb(223, 235, 255)'
      case 'red': return 'rgb(255, 231, 237)'
      case 'purple': return 'rgb(236, 229, 251)'
      case 'yellow': return 'rgb(255, 233, 194)'
    }
  }};
`

export default ChatItem;
