import { useAddTaskMutation } from "@/services/queries/othersApi";
import React, { useEffect, useState } from "react";

const AddTaskForm = () => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      setEmail(user.email);
    }
  }, []);

  const [addData, options] = useAddTaskMutation<any>();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = (
      e.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value;
    const time = (
      e.currentTarget.elements.namedItem("time") as HTMLInputElement
    ).value;
    const date = (
      e.currentTarget.elements.namedItem("date") as HTMLInputElement
    ).value;
    const description = (
      e.currentTarget.elements.namedItem("description") as HTMLInputElement
    ).value;

    const data = {
      title,
      time,
      date,
      description,
      email,
    };
    const { Alert } = await import("react-st-modal");

    const result: any = await addData(data);
    if (result?.data?._id) {
      Alert("Task added successfully", "Done!");
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className="w-full lg:w-2/5 pt-5 pb-10 flex flex-col items-center bg-white lg:mt-10"
    >
      <div className="w-10/12 mt-5">
        <label className="text-[#3F51B5] mb-2">Title</label>
        <input
          placeholder="Add a title"
          className="w-full h-16 border-2 rounded-md border-[#3F51B5] bg-white"
          type="text"
          name="title"
          required
        />
      </div>
      <div className="w-10/12 mt-5">
        <label className="text-[#3F51B5] mb-2">Time</label>
        <input
          placeholder="choose a time"
          className="w-full h-16 border-2 rounded-md border-[#3F51B5] bg-white"
          type="time"
          name="time"
          required
        />
      </div>
      <div className="w-10/12 mt-5">
        <label className="text-[#3F51B5] mb-2">Date</label>
        <input
          placeholder="select a date"
          className="w-full h-16 border-2 rounded-md border-[#3F51B5] bg-white"
          type="date"
          name="date"
          required
        />
      </div>

      <div className="w-10/12 mt-5">
        <label className="text-[#3F51B5] mb-2">Description</label>
        <textarea
          placeholder="Add a description"
          className="w-full h-40 border-2 rounded-md border-[#3F51B5] bg-white"
          name="description"
          required
        />
      </div>

      <div className="w-10/12 mt-5">
        <button
          disabled={options?.isLoading}
          className="btn bg-[#3F51B5] text-white hover:bg-[#3f51b4] block w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
