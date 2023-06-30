import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const WelcomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user?.email) {
      router.push("/");
    }
  }, [router]);

  return (
    <div
      className="hero h-screen relative"
      style={{
        backgroundImage: "url(https://i.ibb.co/X4GfPsW/man-todo.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="w-full h-20 bg-[#3F51B5] flex items-center justify-between fixed top-0">
        <span className="text-white text-3xl ml-5">My Todo</span>
        <button
          onClick={() => router.push("/entry")}
          className="bg-white btn hover:bg-white text-[#3F51B5] mr-5 uppercase"
        >
          Log in
        </button>
      </nav>

      <div className="hero-content text-center z-1 ">
        <div className="max-w-xxl">
          <h1 className="mb-5 text-5xl font-bold text-white">MY TODO</h1>
          <p className="mb-5 text-2xl text-white">
            Stay organized and accomplish your goals with our user-friendly
            to-do app website. Manage tasks effortlessly and boost your
            productivity.
          </p>
          <button
            onClick={() => router.push("/entry")}
            className="bg-white btn hover:bg-white text-[#3F51B5] mr-5 uppercase"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
