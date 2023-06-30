import Loading from "@/components/shared/Loading";
import LoginForm from "@/components/welcome/LoginForm";
import RegisterForm from "@/components/welcome/RegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const EntryPage = () => {
  const data: any = useSession();

  const [registered, setRegistered] = useState(true);

  const router = useRouter();

  if (data?.status === "loading") return <Loading></Loading>;

  if (data?.data?.user?.email) {
    localStorage.setItem("user", JSON.stringify(data?.data?.user));
    router.push("/");
  }
  return (
    <div className="h-screen w-full bg-base-200">
      <nav className="w-full h-20 bg-[#3F51B5] flex items-center justify-between">
        <span className="text-white text-3xl ml-5">My Todo</span>
       
      </nav>

      <div className="lg:h-[calc(100vh-80px)] flex items-center justify-center">
        {registered ? <LoginForm setRegistered={setRegistered}></LoginForm> : <RegisterForm setRegistered={setRegistered}></RegisterForm>}
      </div>
    </div>
  );
};

export default EntryPage;
