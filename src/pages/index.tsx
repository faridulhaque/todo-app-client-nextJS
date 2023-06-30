import Image from "next/image";
import { Inter } from "next/font/google";
import HomePage from "@/indexes/HomePage";
import RequireUser from "@/components/HOC/RequireUser";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <RequireUser>
        <HomePage></HomePage>
      </RequireUser>
    </main>
  );
}
