
import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  isAdmin: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin] = useState(false);
  const [user] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ isAdmin, user }}>
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
