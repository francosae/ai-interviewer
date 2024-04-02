"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "../assistant";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import React, { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "@/components/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

export default function Home() {
  const [accessCode, setAccessCode] = useState("");
  useEffect(() => {
    let accessCode = localStorage.getItem("accessCode");
    if (accessCode) {
      setAccessCode(accessCode);
    }
  }, []);

  if (accessCode !== "assword") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <Link href="/">
          <button className="text-blue-500">Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <main>
      <MultiStepLoaderDemo />
      {/* <Assistant /> */}
    </main>
  );
}

let loadingStates = [
  {
    text: "Interview starting in 3",
  },
];

export function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  const [counter, setCounter] = useState(3); // Initial countdown starts at 3
  const [message, setMessage] = useState("Interview starting in 3");

  useEffect(() => {
    if (counter > 0) {
      loadingStates = [{ text: `Interview starting in ${counter}` }];
      const timerId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setLoading(false);
    }
  }, [counter]);

  return (
    <div className=" h-full ">
      {!loading && <Assistant />}
      {/* <Loader loadingStates={loadingStates} loading={loading} duration={1} /> */}
    </div>
  );
}
