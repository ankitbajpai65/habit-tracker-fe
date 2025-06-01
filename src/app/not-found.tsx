"use client";

import Button from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col gap-5 items-center justify-center px-2"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <h2 className="text-2xl md:text-3xl text-center font-bold">Oops, Page Not Found</h2>
      <p className="text-base md:text-lg text-center mb-3">
        It seems like the page you&apos;re looking for doesn&apos;t exist or has
        been moved.
      </p>
      <Button variant="filled" text="Go Back" onClick={() => router.back()} />
    </section>
  );
}
