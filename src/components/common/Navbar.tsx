"use client";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useUserContext } from "@/app/context/userContext";
import Loader from "./Loader";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo_white.png";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { userDetails, setUserDetails } = useUserContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const toggleHabitMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function fetchUserDetails() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/userDetails`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const response = await res.json();

      if (response.status === "ok") {
        setUserDetails({
          id: response.data.id,
          userName: response.data.name,
          email: response.data.email,
          createdAt: response.data.createdAt,
        });
      }
    } catch (error) {
      console.log("Error while logging out:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      const response = await res.json();

      if (response.status === "ok") {
        setUserDetails(null);
        router.push("/login");
      }
    } catch (error) {
      console.log("Error while logging out:", error);
    } finally {
      setShowProfileMenu(false);
    }
  };

  return (
    <nav className="sticky top-0 left-0 bg-[var(--bg-color)] h-16 flex items-center justify-between shadow-md px-20 py-3 z-50">
      <button
        className="text-4xl font-extrabold"
        onClick={() => router.push("/")}
      >
        {/* XYZ */}
        {/* <Img src={logo} alt="" /> */}
        <Image
          src={logo}
          // src={logoWhite}
          width={160}
          height={160}
          alt="Picture of the author"
        />
      </button>
      <span className="flex items-center gap-8">
        <button
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme === "dark" ? (
            <MdOutlineLightMode
              size={35}
              className="hover:bg-gray-700 p-2 rounded-full"
            />
          ) : (
            <MdOutlineDarkMode
              size={35}
              className="hover:bg-gray-200 p-2 rounded-full"
            />
          )}
        </button>
        {!userDetails ? (
          <Button
            variant="filled"
            text="Get Started"
            onClick={() => router.push("/login")}
          />
        ) : (
          <div
            onMouseEnter={toggleHabitMenu}
            onMouseLeave={toggleHabitMenu}
            className="relative py-3"
          >
            <button className={`flex items-center gap-1 px-4`}>
              <FaUserCircle size={28} className="mr-1" />
              {userDetails.userName}
              <IoIosArrowDown
                size={14}
                className={`transition-transform ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showProfileMenu && (
              <div className="bg-white absolute top-12 -right-14 w-max flex flex-col justify-center gap-2 p-2 rounded-md shadow-xl z-50">
                <div className="flex items-center gap-2">
                  <FaUserCircle size={32} />
                  <div>
                    <h3 className="text-md font-semibold">
                      {userDetails.userName}
                    </h3>
                    <p className="text-sm font-medium">{userDetails.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-sm flex items-center gap-3 w-max px-3 py-2"
                >
                  <MdLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </span>

      {isLoading && <Loader />}
    </nav>
  );
};

export default Navbar;
