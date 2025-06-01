"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";

const Contact = () => {
  const handleSubmit = () => {
    console.log("submit runs");
  };

  return (
    <section className="py-16">
      <div className="flex flex-col items-center gap-3 text-sm sm:text-base mb-12 px-3">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center ">
          Get in Touch
        </h1>
        <p className="text-center">
          We&apos;d love to hear from you! Reach out anytime.
        </p>
        <span className="flex items-center gap-1 sm:gap-2">
          <span className="flex gap-2 items-center">
            <MdOutlineMailOutline />
            Email:{" "}
          </span>
          <a
            href="mailto:ankit65bajpai@gmail.com"
            className="text-habit-200 font-medium"
          >
            ankit65bajpai@gmail.com
          </a>
        </span>
      </div>
      <form
        action=""
        className="w-full max-w-[450px] flex flex-col gap-4 text-sm sm:text-base m-auto px-4 sm:px-8"
      >
        <Input type="text" placeholder="Enter name" />
        <Input type="text" placeholder="Enter name" />
        <textarea
          name=""
          rows={5}
          id=""
          placeholder="Message"
          className="border border-gray-300 px-3 py-2 rounded-md mb-6"
        />
        <Button variant="filled" text="Submit" onClick={handleSubmit} />
      </form>
    </section>
  );
};

export default Contact;
