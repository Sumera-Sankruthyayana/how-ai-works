import { FaCut } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaEquals } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { RiFunctionLine } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { getSteps } from "./uiSlice";

const activeClass = "bg-green-200 dark:bg-green-900";
const inactiveClass = "bg-gray-200 dark:bg-gray-700";

export default function MainNav() {
  const steps = useSelector(getSteps);
  return (
    <ol className="flex flex-col gap-18 sm:gap-18 lg:gap-6 relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps.map((step) => (
        <li key={step.id} className="ms-6">
          <span
            className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
              step.active || step.done ? activeClass : inactiveClass
            }`}
          >
            {step.done ? (
              <FaCheck />
            ) : step.id === 0 ? (
              <VscDebugStart />
            ) : step.id === 1 ? (
              <FaCut />
            ) : step.id === 2 ? (
              <FaProjectDiagram />
            ) : step.id === 3 ? (
              <FaKey />
            ) : step.id === 4 ? (
              <FaEquals />
            ) : step.id === 5 ? (
              <AiOutlineLineChart />
            ) : step.id === 6 ? (
              <RiFunctionLine />
            ) : step.id === 7 ? (
              <FaLightbulb />
            ) : null}
          </span>
          <h3 className="font-medium leading-tight hidden sm:hidden lg:block">
            {step.title}
          </h3>
          <p className="text-sm hidden sm:hidden lg:block">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
