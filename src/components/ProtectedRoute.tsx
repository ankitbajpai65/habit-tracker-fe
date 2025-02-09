"use client";
import { useUserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { userDetails } = useUserContext();

  if (!userDetails) {
    router.push("/login");
    return null;
  }
  return children;

  //   useEffect(() => {
  //     const token = document.cookie.includes("access_token"); // Check for the token in cookies
  //     console.log(token);
  //     if (!userDetails) {
  //       router.push("/login"); // Redirect to login if not authenticated
  //     }
  //   }, [router]);
};

export default ProtectedRoute;
