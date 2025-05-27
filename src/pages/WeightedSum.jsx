import { useSelector } from "react-redux";
import { getJourneyState } from "./journeySlice";
import MatrixDisplay from "../features/ui/MatrixDisplay";
import { getPairs, getValueData, getWeighedSum } from "./journeySlice";

export default function WeightedSum() {
  const state = useSelector(getJourneyState);
  const { tokens, QKV, dotProduct, softmax } = state;
  const pairs = getPairs(state);
  const valueData = getValueData(state);
  const weightedSum = getWeighedSum(state);

  return tokens.length <= 0 ||
    Object.keys(QKV).length <= 0 ||
    Object.keys(dotProduct).length <= 0 ||
    Object.keys(softmax).length <= 0 ? (
    <div className="flex justify-center items-center">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        One of the previous step is not completed
      </p>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        These vectors are the context-aware representations of each word.
        <br />
        They combine information from the surrounding words based on the
        attention weights.
      </p>
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        Softmax results (attention weights)
        <br />
      </p>
      {Object.entries(pairs).map(([key, value]) => {
        return (
          <span key={key}>
            <input
              type="text"
              id="default-input"
              value={`${key} : ${value.toFixed(3)}`}
              disabled
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </span>
        );
      })}
      <br />
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        Value vectors of each word
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-1">
        {Object.entries(valueData).map(([key, value]) => {
          return (
            <MatrixDisplay key={key} data={value} size={[1, 3]} title={key} />
          );
        })}
      </div>
      <br />

      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        Weighted Sum Results
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-1">
        {Object.entries(weightedSum).map(([key, value]) => {
          return (
            <MatrixDisplay key={key} data={value} size={[1, 3]} title={key} />
          );
        })}
      </div>
    </div>
  );
}
