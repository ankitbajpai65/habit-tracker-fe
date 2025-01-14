import React, { createContext, useContext, useState } from "react";

type UserDetailsType = {
  id: string;
  userName: string;
  email: string;
  createdAt:string;
};

type userContextType = {
  userDetails: UserDetailsType | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsType | null>>;
};

export const UserContext = createContext<userContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
