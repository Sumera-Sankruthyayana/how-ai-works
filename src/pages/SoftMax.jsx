import { useSelector } from "react-redux";
import { getJourneyState } from "./journeySlice";
import { softmax } from "../services/apiQKVService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSoftmax } from "./journeySlice";
import { setLoading } from "./journeySlice";
export default function Softmax() {
  const { tokens, QKV, dotProduct } = useSelector(getJourneyState);
  const [softmaxResult, setSoftmaxResult] = useState();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: softmax,
    onSuccess: (data) => {
      setSoftmaxResult(data.attentionWeights);
      dispatch(setSoftmax(data.attentionWeights));
      dispatch(setLoading(false));
    },
    onError: (error) => {
      console.error(error);
      dispatch(setLoading(false));
    },
  });

  function handleComputeSoftmax() {
    dispatch(setLoading(true));
    mutate({ dotProduct });
  }

  return tokens.length <= 0 ||
    Object.keys(QKV).length <= 0 ||
    Object.keys(dotProduct).length <= 0 ? (
    <div className="flex justify-center items-center">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        No tokens defined in the previous step Or the QKV Or dot product is not
        computed
      </p>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          <span className="text-2xl font-bold underline">SoftMax</span>
          <br />
          The softmax function takes a list of numbers (called logits) and turns
          them into a probability distribution — a list of values between 0 and
          1 that all sum to 1.
          <br />
          Basically, we subtract each logit from the maximum logit value, then
          apply the exp function to the result and normalize the values
          <br />
          These attention weights represent how much each word pays attention to
          another, after normalizing the raw scores: <br />
          Higher the attention weight, more the word pays attention to another
          word.
          <br />
          Click on the button below to compute the softmax
          <br />
          <button
            type="button"
            onClick={handleComputeSoftmax}
            disabled={isLoading}
            className="mt-4 mb-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Compute SoftMax
          </button>
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        {softmaxResult &&
          Object.entries(softmaxResult).map(([key, value]) => {
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
