import RequireUser from "@/components/HOC/RequireUser";
import Navbar from "@/components/shared/Navbar";
import TodoPage from "@/indexes/TodoPage";
import React from "react";

const todo = () => {
  return (
    <>
      <RequireUser>
        <TodoPage></TodoPage>
      </RequireUser>
    </>
  );
};

export default todo;
