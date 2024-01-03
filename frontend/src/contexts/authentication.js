import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const AuthenticationProvider = ({ children }) => {
  
  //  Define os valores a disponibilizar pelo contexto
  const [myInfo, setMyInfo] = useState( '' );

  const updateMyInfo = (newData) => {
    setMyInfo(newData);
  };

  // Chamada de aautenticação

  return (
    <MyContext.Provider value={{ myInfo, updateMyInfo }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};