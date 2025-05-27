import { useSelector } from "react-redux";
import { getJourneyState } from "./journeySlice";
import EmbeddingFormatter from "../features/ui/EmbeddingFormatter";
export default function Embedding() {
  const { tokens, data } = useSelector(getJourneyState);
  return tokens.length <= 0 ? (
    <div className="flex justify-center items-center">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        No tokens defined in the previous step
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center items-center">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          <span className="text-2xl font-bold underline">Embedding</span>
          <br />
          An embedding is a way to convert words into numerical vectors,
          allowing computers to understand and compare their meanings. Words
          with similar meanings are represented by vectors that are close to
          each other in this space.
          <br />
          <br />
          In this demo, the embeddings for each word (or token) are inspired by
          common word-to-vector libraries, which are typically trained on large
          text corpora such as Common Crawl. <br />
          <br />
          For simplicity, we've reduced these embeddings to just three
          dimensions to make them easier to visualize.
          <br /> The components are:
          <br />
          <span className="font-bold text-red-500">x:</span> Represents the
          word’s grammatical role or pronoun category (set to 1.0 for all tokens
          in this example)
          <br />
          <span className="font-bold text-green-500">y:</span> Reflects sentence
          function or group identity (fixed at 0.5 — representing a shared
          context)
          <br />
          <span className="font-bold text-blue-500">z:</span> Differentiates
          specific traits such as gender, plurality, or person
          <br />
          <br />
          Modern GPT model can contail over 1024 dimensions!{" "}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="text-1xl font-medium text-center text-gray-900 dark:text-white flex flex-col gap-2">
          The embeddings for your tokens are :<br />
          {tokens.map((token) => (
            <div
              key={token}
              className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-row justify-between">
                <span className="text-1xl font-bold text-center text-gray-900 dark:text-white">
                  {`"${token}"`}
                </span>
                <span className="text-1xl font-medium text-center text-gray-900 dark:text-white">
                  <EmbeddingFormatter
                    embedding={
                      data.find((item) => item.word === token).embedding
                    }
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
