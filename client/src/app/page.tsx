"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { useVapi } from "@/hooks/useVapi";

export default function Home() {
  const [accessCode, setAccessCode] = useState("");

  const { stop } = useVapi();

  useEffect(() => {
    stop();
  }, []);
  
  
  function checkAccessCode(e: any) {
    e.preventDefault();
    if (e.target.value === "assword") {
      setAccessCode(e.target.value);
    }
  }

  function setLocalStorage() {
    localStorage.setItem("accessCode", accessCode);
  }

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          {`Real-time Mock Interviews, \n
        powered by AI.`}
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Input type="password" onChange={(e) => checkAccessCode(e)}></Input>
          <Link href={accessCode === "assword" ? "/dashboard" : "/"}>
            <Button
              disabled={accessCode !== "assword"}
              onClick={setLocalStorage}
              className="bg-black text-white font-light text-xl w-30 h-25">
              Try it out
            </Button>
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
