"use client";
import { useUserContext } from "@/app/context/userContext";
import { errorAlert, successAlert } from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { validateEmail, validatePassword } from "@/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { setUserDetails } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputDetails, setInputDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputDetails((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const validationRes = validateEmail(value);
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
      if (!inputDetails.email.trim() || !inputDetails.password.trim()) {
        setErrorMsg("All fields are required*");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(inputDetails),
        }
      );
      const res = await response.json();

      if (res.status === "ok") {
        router.push("/habits");
        setUserDetails({
          id: res.data.id,
          userName: res.data.name,
          email: res.data.email,
          createdAt: res.data.createdAt,
        });

        setInputDetails({
          email: "",
          password: "",
        });
      } else {
        errorAlert(1000, res.error, theme!);
      }
    } catch (error) {
      console.log("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="flex justify-center items-center z-10 px-3"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-[480px] bg-[var(--auth-bg)] flex flex-col gap-4 text-sm sm:text-base m-auto px-6 py-10 sm:p-10 rounded-md"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Login to your account
        </h2>
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
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="filled"
              text="Login"
              loading={isLoading}
              style="w-full"
            />
            <Button
              type="button"
              variant="filled"
              text="Continue as guest"
              // onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center text-sm">
          <div className="flex gap-3 items-center">
            <span>Don&apos;t have an account?</span>
            <Link href="/signup" className="text-habit-200 font-medium">
              Signup
            </Link>
          </div>
          <Link href="/forget-password">Forget Password</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
