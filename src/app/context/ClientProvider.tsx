"use client";
import { UserProvider } from "./userContext";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default ClientProvider;
