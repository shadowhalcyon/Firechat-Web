import React from 'react';
import styled from 'styled-components'
import ChatItem from './ChatItem'
import ChatNew from './ChatNew'

function ChatList({ data, selected, loading, setSelected }) {
  return (
    <List>
      { data.chats.map(chat => <ChatItem active={chat.user === selected} onClick={() => !loading && setSelected(chat.user)} {...chat} />) }
      <ChatNew data={data} />
    </List>
  )
}

const List = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: 500px;
  border-right: 1px solid rgb(238, 238, 243);
`

// PURPLE
// rgb(236, 229, 251)
// rgb(108, 55, 214)

// GREEN
// rgb(187, 248, 223)
// rgb(40, 162, 111)

// YELLOW
// rgb(255, 233, 194)
// rgb(239, 131, 23)


// RED
// rgb(255, 231, 237)
// rgb(227, 119, 129)

// BLUE
// rgb(223, 235, 255)
// rgb(117, 150, 209)



export default ChatList
