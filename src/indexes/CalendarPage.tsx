import AddTaskForm from "@/components/calendar/AddTaskForm";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CalendarPage = () => {
  return (
    <div className="lg:bg-base-200 h-screen">
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="flex justify-center">
        <AddTaskForm></AddTaskForm>
      </main>
    </div>
  );
};

export default CalendarPage;
