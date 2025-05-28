import { useSelector, useDispatch } from "react-redux";
import { getJourneyState } from "./journeySlice";
import { getW_Q, getW_K, getW_V } from "../services/apiQKVService";
import { useQuery, useMutation } from "@tanstack/react-query";
import MatrixDisplay from "../features/ui/MatrixDisplay";
import { computeQKV } from "../services/apiQKVService";
import { setQKV } from "./journeySlice";
import { useState } from "react";
import { setLoading } from "./journeySlice";
export default function QueryKeyvalue() {
  const { tokens } = useSelector(getJourneyState);
  const dispatch = useDispatch();
  const [queryKeyValues, setQueryKeyValues] = useState();
  const { mutate, isLoading } = useMutation({
    mutationFn: computeQKV,
    onSuccess: (data) => {
      setQueryKeyValues(data.result);
      dispatch(setQKV(data.result));
      dispatch(setLoading(false));
    },
    onError: (error) => {
      console.error("Error:", error.message);
      dispatch(setLoading(false));
    },
  });

  const handleComputeQKV = () => {
    dispatch(setLoading(true));
    mutate({ tokens });
  };

  const {
    data: W_Q,
    isLoading: W_Q_loading,
    isError: W_Q_error,
  } = useQuery({
    queryKey: ["W_Q"],
    queryFn: getW_Q,
  });
  const {
    data: W_K,
    isLoading: W_K_loading,
    isError: W_K_error,
  } = useQuery({
    queryKey: ["W_K"],
    queryFn: getW_K,
  });
  const {
    data: W_V,
    isLoading: W_V_loading,
    isError: W_V_error,
  } = useQuery({
    queryKey: ["W_V"],
    queryFn: getW_V,
  });

  return tokens.length <= 0 ? (
    <div className="flex justify-center items-center">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        No tokens defined in the previous step
      </p>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center items-center">
          <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
            <span className="text-2xl font-bold underline">
              Query Key Value
            </span>
            <br />
            A Query Key Value matrix is used to compute attention score.
            <br /> <br />
            The goal of attention is to allow a model to focus on different
            parts of the input when producing an output. For each word (or
            token), the model decides how much attention it should pay to other
            words.
            <br />
            <br />
            Q - The Query Matrix is used to determine what a word is looking
            for.
            <br />
            K - The Key Matrix is used to determine what information is
            contained.
            <br />
            V - The Value Matrix is used to determine what to return if
            relevant.
            <br /> <br />
            At a high level, following steps are performed to arrive at the QKV
            Matrices <br /> <br />
            Stack Embeddings into a Matrix <br />
            Compute the Mean vector and covariance matrix of the stacked
            embeddings <br />
            Extract Principal Axes (eigenvectors) of the covariance matrix{" "}
            <br />
            Use the Eigenvectors to transform the embeddings into the Q, K, V
            matrices <br />
            <br />
            Q = W_Q = Original eigenvector Matrix <br />
            K = W_K = Roll the rows of eigenvector matrix by 1 <br />
            V = W_V = Roll the rows again by 2 <br />
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 lg:gap-4">
          {!W_Q_loading && !W_Q_error && (
            <MatrixDisplay data={W_Q.data} size={[W_Q.size]} title="W_Q" />
          )}
          {!W_K_loading && !W_K_error && (
            <MatrixDisplay data={W_K.data} size={[W_K.size]} title="W_K" />
          )}
          {!W_V_loading && !W_V_error && (
            <MatrixDisplay data={W_V.data} size={[W_V.size]} title="W_V" />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          We now multiply the embeddings of the tokens with the W_Q, W_K, W_V.{" "}
          <br />
          Click on the button below to compute the QKV matrices.
          <br />
          <button
            type="button"
            onClick={handleComputeQKV}
            disabled={isLoading}
            className="mt-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Compute QKV
          </button>
        </p>
        {queryKeyValues &&
          tokens.map((token) => (
            <div key={token} className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 lg:gap-4">
                {Object.entries(queryKeyValues).map(
                  ([key, value]) =>
                    key.split("_")[0] === token && (
                      <MatrixDisplay
                        key={key}
                        data={value.data}
                        size={[value.size]}
                        title={key}
                      />
                    )
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
