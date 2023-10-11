import RequireUser from "@/components/HOC/RequireUser";
import ArchivePage from "@/indexes/ArchivePage";
import React from "react";

const archive = () => {
  return (
    <>
      <RequireUser>
        <ArchivePage></ArchivePage>
      </RequireUser>
    </>
  );
};

export default archive;
