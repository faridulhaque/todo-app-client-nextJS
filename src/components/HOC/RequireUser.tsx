import { useRouter } from "next/router";
import React, { useEffect } from "react";

const RequireUser = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user") || "null");

    if (user === null || !user.email) {
      router.replace("/welcome");
    }
  }, [router]);

  return <>{children}</>;
};

export default RequireUser;
