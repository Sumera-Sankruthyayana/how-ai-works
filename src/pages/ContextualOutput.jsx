import { useSelector } from "react-redux";
import { getJourneyState } from "./journeySlice";
import { useMutation } from "@tanstack/react-query";
import { computSoftMaxProbability } from "../services/apiQKVService";
import { getWeighedSum } from "./journeySlice";
import { useState } from "react";
export default function ContextualOutput() {
  const state = useSelector(getJourneyState);
  const { tokens, QKV, dotProduct, softmax } = state;
  const weightedSum = getWeighedSum(state);
  const lastToken = tokens[tokens.length - 1];
  const lastWordOutputVector = weightedSum[lastToken];
  const [softmaxProbabilities, setSoftmaxProbabilities] = useState();

  const mutation = useMutation({
    mutationFn: computSoftMaxProbability,
    onSuccess: (data) => {
      const sortedResults = Object.entries(data.result)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      console.log(sortedResults);
      setSoftmaxProbabilities(sortedResults);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
    <div className="flex flex-col justify-center items-center">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        These vectors are the context-aware representations of each word.
        <br />
        They combine information from the surrounding words based on the
        attention weights.
      </p>
      <br />
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        Click on the button below to compute the softmax probabilities of the
        output vector with all the word embeddings in the vocabulary
      </p>
      <br />
      <button
        type="button"
        onClick={() => mutation.mutate({ outputVector: lastWordOutputVector })}
        className="mt-4 mb-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Compute SoftMax Probabilities
      </button>
      {softmaxProbabilities && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Word
                </th>
                <th scope="col" className="px-6 py-3">
                  Probability
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(softmaxProbabilities)
                .sort((a, b) => b[1] - a[1]) // Sort by probability descending
                .map(([word, probability], index) => (
                  <tr
                    key={word}
                    className={`${
                      index < 5
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-white dark:bg-gray-800"
                    } border-b dark:border-gray-700`}
                  >
                    <td className="px-6 py-4">{word}</td>
                    <td className="px-6 py-4">
                      {Number(probability).toFixed(3)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {softmaxProbabilities && (
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          The word with the highest probabilities are the most likely next
          words! <br />
          Some of the predicted words might not seem right and this is because,
          we have a 3D nature of embeddings.
          <br />
          Higher the dimension, more the information that can be stored in the
          embedding, and more the information, more the context, and better the
          prediction.
        </p>
      )}
    </div>
  );
}
