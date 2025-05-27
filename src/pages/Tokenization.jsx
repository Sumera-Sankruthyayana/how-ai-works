import { useQuery } from "@tanstack/react-query";
import { apiGetWordsAndEmbeddings } from "../services/apiGetWordsAndEmbeddings";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setSentence, setData } from "./journeySlice";
import { getJourneyState } from "./journeySlice";

export default function Tokenization() {
  const [validationError, setValidationError] = useState("");
  const [currentTokens, setCurrentTokens] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["wordsAndEmbeddings"],
    queryFn: apiGetWordsAndEmbeddings,
  });

  const dispatch = useDispatch();
  const { tokens } = useSelector(getJourneyState);

  useEffect(() => {
    setCurrentTokens(tokens);
  }, [tokens]);

  function handleSetSentence(sentence) {
    sentence = sentence.trim();
    sentence = sentence.split(" ");
    if (sentence.length === 0) {
      setValidationError("Please enter a sentence");
    } else if (sentence.length != 2) {
      setValidationError("Please enter a sentence with exactly two words");
    } else if (sentence.length === 2) {
      const words = data.map((item) => item.word);
      for (const word of sentence) {
        if (!words.includes(word.toLowerCase())) {
          setValidationError(`The word "${word}" is not in the vocabulary`);
        } else {
          setValidationError("");
          dispatch(setSentence(sentence.join(" ").toLowerCase()));
          dispatch(setData(data));
        }
      }
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center items-center">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          <span className="text-2xl font-bold underline">Tokenization</span>
          <br />
          Tokenization is the process of splitting text into smaller units
          called tokens. For example, the sentence "The quick brown fox jumps
          over the lazy dog" can be tokenized into the following tokens: <br />{" "}
          ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy",
          "dog"].
        </p>
      </div>

      <div className="flex justify-center items-center">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          For this example, let's assume the English vocabulary is the following
          20 words:
          <br />
          <br />
          {data && !isLoading && !error && (
            <span>
              {data.map((word) => (
                <button
                  key={word.word}
                  disabled
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  {word.word}
                </button>
              ))}
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          Make a two word sentence with the above words (in a way that a next
          word would be possible) to predict the next word.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const sentence = e.target.elements.sentence.value;
            handleSetSentence(sentence);
          }}
        >
          <div className="flex flex-col items-center">
            <div className="p-2 w-64">
              <input
                type="text"
                id="sentence"
                name="sentence"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {validationError && (
              <p className="text-1xl font-medium text-center text-red-700">
                {validationError}
              </p>
            )}
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Set Sentence
              </span>
            </button>
          </div>
        </form>

        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          Your tokens are:
        </p>
        <div className="p-2">
          <input
            type="text"
            id="default-input"
            value={
              currentTokens.length > 0
                ? `["${currentTokens[0]}", "${currentTokens[1]}"]`
                : ""
            }
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
