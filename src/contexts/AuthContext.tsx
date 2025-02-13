
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin] = useState(false);

  return (
    <AuthContext.Provider value={{ isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
