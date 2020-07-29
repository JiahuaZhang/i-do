import React, { createContext, ReactNode } from 'react';

export const createGenericContext = <T extends {}>(hook: () => T) => {
  const GenericContext = createContext({} as T);

  const GenericContextProvider = ({ children }: { children: ReactNode }) => (
    <GenericContext.Provider value={hook()}>{children}</GenericContext.Provider>
  );

  return { GenericContext, GenericContextProvider };
};
