import { createContext, useContext, useRef } from 'react';
import RootStore from './RootStore';

const RootContext = createContext<RootStore>(new RootStore());

type RootStoreProviderProps = {
  children: React.ReactNode;
};

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
  const refStore = useRef<RootStore>(new RootStore());

  return <RootContext.Provider value={refStore.current}>{children}</RootContext.Provider>;
};

export const useRootStoreContext = () => useContext(RootContext);
