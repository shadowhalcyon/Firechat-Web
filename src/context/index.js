import React, { useState, createContext } from 'react';

const Context = createContext();

function Provider({ children }) {
  const [user, setUser] = useState();


  return (
     <Context.Provider value={[user, setUser]}>
      { children }
     </Context.Provider>
  );
}

export { Context, Provider };
