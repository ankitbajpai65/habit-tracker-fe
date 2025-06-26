"use client";
import { successAlert } from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { validateEmail, validateName, validatePassword } from "@/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { ToastContainer } from "react-toastify";

export default function Signup() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputDetails, setInputDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputDetails((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      const validationRes = validateName(value);
      if (!validationRes.valid) setErrorMsg(validationRes.message);
      else setErrorMsg("");
    } else if (name === "email") {
      const validationRes = validateEmail(value);
      if (!validationRes.valid) setErrorMsg(validationRes.message);
      else setErrorMsg("");
    } else if (name === "password") {
      const validationRes = validatePassword(value);
      if (!validationRes.valid) setErrorMsg(validationRes.message);
      else setErrorMsg("");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (errorMsg) return;
      if (
        !inputDetails.name.trim() ||
        !inputDetails.email.trim() ||
        !inputDetails.password.trim()
      ) {
        setErrorMsg("All fields are mandatory*");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputDetails),
        }
      );
      const res = await response.json();

      if (res.status === "ok") {
        successAlert(1000, "User registered successfully", theme!);
        setInputDetails({
          name: "",
          email: "",
          password: "",
        });
      } else if (res.status === "error") setErrorMsg(res.error);
    } catch (error) {
      console.log("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="flex justify-center items-center px-3"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-[480px] bg-[var(--auth-bg)] flex flex-col gap-4 text-sm sm:text-base m-auto px-6 py-10 sm:p-10 rounded-md"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Create an account
        </h2>
        <Input
          type="text"
          placeholder="Enter name"
          name="name"
          value={inputDetails.name}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="email"
          placeholder="Enter email"
          name="email"
          value={inputDetails.email}
          onChange={(e) => handleInputChange(e)}
        />
        <span className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            value={inputDetails.password}
            style="w-full"
            onChange={(e) => handleInputChange(e)}
          />
          <button
            type="button"
            className="absolute right-4 top-3"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </span>
        <div className="flex flex-col gap-4 mt-5">
          {errorMsg && (
            <span className="text-red-600 text-center text-xs">{errorMsg}</span>
          )}
          <Button
            type="submit"
            variant="filled"
            text="Signup"
            loading={isLoading}
            style="w-full"
          />
        </div>
        {/* <Button text="Continue as guest" onClick={handleSubmit} /> */}
        <div className="flex flex-col gap-2 items-center text-sm">
          <div className="flex gap-1 items-center">
            <span>Already have an account?</span>
            <Link href="/login" className="text-habit-200 font-medium">
              Login
            </Link>
          </div>
        </div>
      </form>

      <ToastContainer />
    </section>
  );
}
