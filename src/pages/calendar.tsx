import RequireUser from "@/components/HOC/RequireUser";
import CalendarPage from "@/indexes/CalendarPage";
import React from "react";

const calendar = () => {
  return (
    <>
      <RequireUser>
        <CalendarPage></CalendarPage>
      </RequireUser>
    </>
  );
};

export default calendar;
