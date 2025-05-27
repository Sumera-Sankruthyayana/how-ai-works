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
        className={`grid grid-cols-7 gap-1 ${isFetching > 0 ? "blur-sm" : ""}`}
      >
        <div className="col-span-1">
          <MainNav />
        </div>
        <div className="col-span-6 flex flex-col items-center justify-between min-h-full p-2">
          <MainHead />
          <div className="p-2 overflow-y-auto max-h-[calc(100vh-200px)] border-2 border-gray-300 dark:border-gray-700 rounded-lg">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
