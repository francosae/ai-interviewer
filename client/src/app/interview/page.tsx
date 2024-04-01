import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "../assistant";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Assistant />
    </main>
  );
}
