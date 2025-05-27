import { useSelector } from "react-redux";
import { getJourneyState } from "./journeySlice";
import { dotProduct } from "../services/apiQKVService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDotProduct } from "./journeySlice";

export default function DotProduct() {
  const { tokens, QKV } = useSelector(getJourneyState);
  const [dotProductResult, setDotProductResult] = useState();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: dotProduct,
    onSuccess: (data) => {
      setDotProductResult(data.result);
      dispatch(setDotProduct(data.result));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return tokens.length <= 0 || Object.keys(QKV).length <= 0 ? (
    <div className="flex justify-center items-center">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        No tokens defined in the previous step Or the QKV matrix is not computed
      </p>
    </div>
  ) : (
    <>
      <div className="flex justify-center items-center">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          <span className="text-2xl font-bold underline">Dot Product</span>
          <br />
          The dot product is a mathematical operation that takes two vectors and
          returns a single number. It is calculated by multiplying corresponding
          elements of the vectors and summing the results.
          <br />
          <br />
          The dot product is used to compute the attention score <br />
          <br />
          Dot Products of Q ⋅ K for all token combinations. The higher the dot
          product, the more similar the tokens are.
          <br />
          Click on the button below to compute the dot product
          <br />
          <button
            type="button"
            onClick={() => mutation.mutate({ tokens })}
            className="mt-4 mb-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Compute Dot Product
          </button>
        </p>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        {dotProductResult &&
          Object.entries(dotProductResult).map(([key, value]) => {
            const [from, to] = key.split(">");
            return (
              <span key={key}>
                <input
                  type="text"
                  id="default-input"
                  value={`${from} > ${to} : ${value.toFixed(3)}`}
                  disabled
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </span>
            );
          })}
      </div>
    </>
  );
}
