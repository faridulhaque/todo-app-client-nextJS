import Navbar from "@/components/shared/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="w-full">
        <h2 className="text-center text-[#333333] mt-5 text-4xl">
          All scheduled tasks
        </h2>
      </main>
    </>
  );
};

export default HomePage;
