import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import { UserProvider } from 'context/UserContext';
import { ChatsProvider } from 'context/ChatsContext';
import { SelectedProvider } from 'context/SelectedContext';

ReactDOM.render(
  <UserProvider>
    <ChatsProvider>
      <SelectedProvider>
        <App />
      </SelectedProvider>
    </ChatsProvider>
  </UserProvider>,
  document.getElementById('root')
);
