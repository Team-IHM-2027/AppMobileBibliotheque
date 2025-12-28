import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  emailHigh: '',
  setEmailHigh: () => {},
  docRecent: [],
  setDocRecent: () => {},
  currentUserNewNav: null,
  setCurrentUserNewNav: () => {},
  datUserTest: false,
  setDatUserTest: () => {},
  datUser: null,
  setDatUser: () => {}
});

export const UserContextProvider = ({ children }) => {
  const [emailHigh, setEmailHigh] = useState('');
  const [docRecent, setDocRecent] = useState([]);
  const [currentUserNewNav, setCurrentUserNewNav] = useState(null);
  const [datUserTest, setDatUserTest] = useState(false);
  const [datUser, setDatUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        emailHigh,
        setEmailHigh,
        docRecent,
        setDocRecent,
        currentUserNewNav,
        setCurrentUserNewNav,
        datUserTest,
        setDatUserTest,
        datUser,
        setDatUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const docRecentNewNav = [{"cathegorieDoc": "Mathematique", "type": "analyse"}];
