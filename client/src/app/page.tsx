"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
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
        <Link href="/interview">
          <Button className="bg-black text-white font-light text-xl w-30 h-25">
            Try it out
          </Button>
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
