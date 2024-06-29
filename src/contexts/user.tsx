import { useState, createContext, ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser } from 'src/mocks/user-data';

interface UserContextProps {
  // user: typeof UserType;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  // setUser: React.Dispatch<React.SetStateAction<typeof UserType>>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<typeof UserType>({} as typeof UserType);
  const [token, setToken] = useState<string>('');

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
