import React, { useState, createContext } from 'react';

const SelectedContext = createContext();

function SelectedProvider({ children }) {
  const [selected, setSelected] = useState();

  return (
     <SelectedContext.Provider value={[selected, setSelected]}>
      { children }
     </SelectedContext.Provider>
  );
}

export { SelectedContext, SelectedProvider };
