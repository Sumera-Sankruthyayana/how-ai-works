import MainNav from "./MainNav";
import MainHead from "./MainHead";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useIsFetching } from "@tanstack/react-query";
export default function AppLayout() {
  const isFetching = useIsFetching();
  return (
    <div className="relative bg-slate-100 dark:bg-slate-900 min-h-screen p-6">
      {isFetching > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs z-50">
          <Spinner />
        </div>
      )}
      <div
        className={`grid grid-cols-14 lg:grid-cols-6 sm:grid-cols-10 gap-1 ${
          isFetching > 0 ? "blur-sm" : ""
        }`}
      >
        <div className="col-span-1">
          <MainNav />
        </div>
        <div className="col-span-13 lg:col-span-5 sm:col-span-9 flex flex-col items-center justify-between min-h-full gap-2">
          <MainHead />
          <div className="p-0.5 overflow-y-auto max-h-[calc(100vh-200px)] border-1 border-gray-300 dark:border-gray-700 rounded-lg">
            <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
