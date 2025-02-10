import React, { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

interface AuthContextProps {
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({ user: null });

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
