import { useDispatch, useSelector } from "react-redux";
import { reset, next, previous, getCurrentStep, getSteps } from "./uiSlice";
import { resetJourneyState } from "../../pages/journeySlice";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector(getCurrentStep);
  const steps = useSelector(getSteps);

  function handleBack() {
    dispatch(previous(currentStep.id - 1));
    navigate(steps.find((step) => step.id === currentStep.id - 1).path);
  }

  function handleNext() {
    dispatch(next(currentStep.id + 1));
    navigate(steps.find((step) => step.id === currentStep.id + 1).path);
  }

  function handleReset() {
    dispatch(reset());
    dispatch(resetJourneyState());
    navigate("/");
  }

  return (
    <>
      <footer className="pt-2 flex justify-center gap-2 justify-self-end">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep.id === 0}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Back
          </span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Reset
          </span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentStep.id === 7}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Next
          </span>
        </button>
      </footer>
    </>
  );
}
