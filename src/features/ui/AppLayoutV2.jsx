import MainNav from "./MainNav";
import MainHead from "./MainHead";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useIsFetching } from "@tanstack/react-query";
export default function AppLayoutV2() {
  const isFetching = useIsFetching();
  return (
    <div className="relative bg-slate-100 dark:bg-slate-900 min-h-screen px-8">
      {isFetching > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs z-50">
          <Spinner />
        </div>
      )}
      <header className="mb-2 p-1">
        <MainHead />
      </header>
      <main className="grid grid-cols-14 lg:grid-cols-6 sm:grid-cols-10 gap-1">
        <div className="col-span-1 lg:p-2 p-1">
          <MainNav />
        </div>
        <div className="col-span-13 lg:col-span-5 sm:col-span-9 flex flex-col items-center justify-between min-h-full gap-2">
          <div className="p-1 overflow-y-auto max-h-[calc(100vh-200px)] ">
            <Outlet />
          </div>
        </div>
      </main>
      <footer>
        <hr className="w-full  h-1 mx-auto bg-gray-300 border-0 rounded-sm dark:bg-gray-700" />
        <Footer />
      </footer>
    </div>
  );
}
