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
    <section className="py-10">
      <div className="flex flex-col items-center gap-3 mb-12">
        <h1 className="text-4xl font-bold leading-tight text-center ">
          Get in Touch
        </h1>
        <p>We&apos;d love to hear from you! Reach out anytime.</p>
        <div className="flex gap-5 items-center mt-5">
          <MdOutlineMailOutline />
          <span>Email: support@xyz.com</span>
        </div>
      </div>
      <form action="" className="w-[480px] flex flex-col gap-4 m-auto px-8">
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
