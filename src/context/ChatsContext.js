import React, { useState, createContext } from 'react';

const ChatsContext = createContext();

function ChatsProvider({ children }) {
  const [chats, setChats] = useState();

  return (
     <ChatsContext.Provider value={[chats, setChats]}>
      { children }
     </ChatsContext.Provider>
  );
}

export { ChatsContext, ChatsProvider };
