import { createContext } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children, navigation }) => {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};
