import Loading from "@/components/shared/Loading";
import Navbar from "@/components/shared/Navbar";
import TaskTable from "@/components/shared/TaskTable";
import { useGetArchiveTasksQuery } from "@/services/queries/othersApi";
import React, { useEffect, useState } from "react";

const ArchivePage = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      setEmail(user.email);
    }
  }, []);

  const { data, isLoading } = useGetArchiveTasksQuery<any>(email);

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="min-h-screen w-full">
      <Navbar></Navbar>

      <h2 className="text-center text-4xl mt-5">Completed tasks!</h2>
      <div className="w-full">
        <p className="mt-5 text-md text-red-500 text-center lg:hidden">
          This device is too small to view this page
        </p>

        <TaskTable tasks={data}></TaskTable>
      </div>
    </div>
  );
};

export default ArchivePage;
