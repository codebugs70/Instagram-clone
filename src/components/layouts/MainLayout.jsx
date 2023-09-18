import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../shared/LeftSidebar";
import RightSidebar from "../shared/RightSidebar";
import { useSelector } from "react-redux";
import LeftSidebarMobile from "../shared/LeftSidebarMobile";
import BottomBar from "../shared/Bottombar";
/* ====================================================== */

const MainLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <section>
      <div className="flex items-start justify-between">
        <LeftSidebar />
        <LeftSidebarMobile />
        <BottomBar />
        <div className="flex flex-1 gap-10 xl:gap-[64px] lg:px-5 xl:px-32 mt-5 md:mt-12">
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
