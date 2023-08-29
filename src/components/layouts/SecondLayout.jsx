import React from "react";
import LeftSidebar from "../shared/LeftSidebar";
import { Outlet } from "react-router-dom";

const SecondLayout = () => {
  return (
    <section>
      <div className="flex items-start justify-between">
        <LeftSidebar />
        <main className="flex-1 w-full max-w-[975px] mx-auto mt-12">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default SecondLayout;
