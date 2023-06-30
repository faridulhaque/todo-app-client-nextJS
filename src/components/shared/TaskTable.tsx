import {
  useChangeStatusMutation,
  useDeleteTaskMutation,
} from "@/services/queries/othersApi";
import { useRouter } from "next/router";
import React from "react";

const TaskTable = ({ tasks }: any) => {
  const router = useRouter();

  const [deleteTask, del_info] = useDeleteTaskMutation<any>();
  const [changeStatus, status_info] = useChangeStatusMutation<any>();

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    let formattedHour = parseInt(hour);
    let period = "AM";

    if (formattedHour > 12) {
      formattedHour -= 12;
      period = "PM";
    }

    return `${formattedHour}:${minute} ${period}`;
  };

  const handleStatus = async (data: any) => {
    const { Alert } = await import("react-st-modal");

    data.complete = !data.complete;
    const result: any = await changeStatus(data);
    if (result?.data?.complete === false) {
      Alert("Task moved to archive!", "Done!");
    } else if (result?.data?.complete === true) {
      Alert("Task moved back to incomplete task list!", "Done!");
    }
  };

  const handleDelete = async (id: string) => {
    const { Confirm, Alert } = await import("react-st-modal");
    const isConfirmed = await Confirm(
      "You can't undo this action",
      "Are you sure?"
    );

    if (isConfirmed) {
      const result: any = await deleteTask(id);
      if (result?.data?._id) {
        Alert("You deleted a task successfully", "Done!");
      }
    }
  };

  return (
    <div className="overflow-x-auto hidden lg:block w-11/12 mx-auto mt-5">
      <table className="table">
        <thead>
          <tr>
            <th>sl</th>
            <th>Title</th>
            <th>Description</th>
            <th>Time</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task?.title}</td>
              <td>{task?.description}</td>
              <td>{formatTime(task?.time)}</td>
              <td>{task?.date}</td>
              {router.route === "/todo" ? (
                <td
                  className={`${
                    task?.complete ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {task.complete ? "Complete" : "Incomplete"}
                </td>
              ) : (
                <td>
                  <input
                    onClick={() =>
                      handleStatus({ id: task?._id, complete: task?.complete })
                    }
                    disabled={status_info?.isLoading}
                    type="checkbox"
                    defaultChecked={task?.complete}
                    className="checkbox"
                  />
                </td>
              )}

              <td>
                <button
                  onClick={() => handleDelete(task?._id)}
                  disabled={del_info?.isLoading}
                  className="text-white btn bg-red-500 hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
