// PocketBaseProvider.jsx
import React, { useEffect } from 'react';
import PocketBaseContext from './PocketBaseContext';
import PocketBase from 'pocketbase';
import { useState } from 'react';


const pb = new PocketBase('https://financialapp.pockethost.io');

const PocketBaseProvider = ({ children }) => {
  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
};

export default PocketBaseProvider;
