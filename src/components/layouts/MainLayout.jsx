import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../shared/LeftSidebar";
import RightSidebar from "../shared/RightSidebar";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
/* ====================================================== */

const MainLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <section>
      <div className="flex items-start justify-between">
        <LeftSidebar />
        <div className="flex flex-1 gap-[64px] px-32 mt-12">
          <main className="flex-1 w-full max-w-[630px] mx-auto">
            <Outlet />
          </main>
          <RightSidebar />
        </div>
      </div>
    </section>
  );
};

export default MainLayout;
