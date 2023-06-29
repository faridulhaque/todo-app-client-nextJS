import RegisterForm from "@/components/welcome/RegisterForm";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const WelcomePage = () => {
  const data: any = useSession();

  const router = useRouter();

  if (data?.status === "loading") return <></>;

  if (data?.data?.user?.email) {
    localStorage.setItem("user", JSON.stringify(data?.data?.user));
    router.push("/");
  }

  return (
    <div className="h-screen w-full bg-base-200">
      <nav className="w-full h-20 bg-[#3F51B5] flex items-center justify-between">
        <span className="text-white text-3xl ml-5">My Todo</span>
        <button className="bg-white btn hover:bg-white text-[#3F51B5] mr-5 uppercase">
          Log in
        </button>
      </nav>

      <div className="lg:h-[calc(100vh-80px)] flex items-center justify-center">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
};

export default WelcomePage;
