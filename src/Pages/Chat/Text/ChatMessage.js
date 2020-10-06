import React from 'react';
import styled from 'styled-components';

import { formatTime, formatDate, formatText } from 'functions';

const colors = {
  red: 'rgb(227, 119, 129)',
  green: 'rgb(40, 162, 111)',
  blue: 'rgb(117, 150, 209)',
  purple: 'rgb(108, 55, 214)',
  yellow: 'rgb(239, 131, 23)'
}

function ChatMessage({ theme, timestamp, text, sender, email }) {
  const time = formatTime(timestamp);
  const date = formatDate(timestamp);

  return (
    <Box you={sender === email}>
      <Text theme={theme} you={sender === email} dangerouslySetInnerHTML={{ __html: formatText(text) }}></Text>
      <Time>{ time }</Time>
    </Box>
  )
}

const Time = styled.div`
  display: none;
  font-size: 0.7rem;
  color: gray;
  font-weight: 500;
  text-align: right;

  &:hover {
    display: block;
  }

  cursor: default;
`;

const Box = styled.div`
  max-width: 80%;
  align-self: ${props => props.you ? 'flex-end' : 'flex-start'};
  display: flex;
  flex-direction: ${props => props.you ? 'row-reverse' : 'row'};
  grid-gap: 5px;
  align-items: center;
  padding-bottom: 5px;

  &:hover ${Time} {
    display: block;
  }
`;

const Text = styled.div`
  font-weight: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;
  padding: 8px 10px;
  border-radius: 5px;


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

  cursor: default;

  color: ${props => !props.you && 'rgb(120, 120, 120)'};
  background: ${props => !props.you && 'rgb(245, 245, 245)'};
`

export default ChatMessage;
