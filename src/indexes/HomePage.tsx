import Navbar from "@/components/shared/Navbar";
import TaskTable from "@/components/shared/TaskTable";
import {
  useGetAllTaskQuery,
  useGetTodayTaskQuery,
} from "@/services/queries/othersApi";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [email, setEmail] = useState(null);

  const today: any = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      setEmail(user.email);
    }
  }, []);

  const { data, isLoading } = useGetTodayTaskQuery<any>(email);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="min-h-screen w-full">
      <Navbar></Navbar>

      <h2 className="text-center text-4xl mt-5">Upcoming tasks!</h2>
      <p className="text-center text-3xl text-[#333333] mt-5">
        Today is {formattedDate}!{" "}
        {data?.length
          ? `You have ${
              data?.length == 1
                ? `${data?.length} task`
                : `${data?.length} tasks`
            } to complete.`
          : "You don't have any task for today."}
      </p>
      {data?.length && (
        <div className="w-full">
          <p className="mt-5 text-md text-red-500 text-center lg:hidden">
            This device is too small to view this page
          </p>

          <TaskTable tasks={data}></TaskTable>
        </div>
      )}
    </div>
  );
};

export default HomePage;
