import React, { ReactNode } from "react";
import Navbar from "@/components/navigation/navbar";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import RightSidebar from "@/components/navigation/RightSidebar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="flex w-full pt-[80px]">
        <LeftSideBar />
        <section className="flex-1 min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};
export default RootLayout;
