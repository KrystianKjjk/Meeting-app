import React from 'react';

export const ScreenContext = React.createContext({
  currentScreen: null,
  handleScreenChange: () => { }
});
