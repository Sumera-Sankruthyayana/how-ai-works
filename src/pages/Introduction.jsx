import { RiRobot2Fill } from "react-icons/ri";

export default function Introduction() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <RiRobot2Fill color="#EC5228" lg:size={300} sm:size={200} size={100} />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-1xl text-center text-gray-900 dark:text-white">
          This interactive demo provides a simple introduction to how AI
          understands language. <br />
          <br />
          Using a limited vocabulary of just 20 common English words, the model
          will try to predict the most likely next word based on a two-word
          sentence you provide. <br />
          <br />
          Along the way, you'll get a glimpse into how the model arrives at its
          prediction.
        </p>
      </div>
    </div>
  );
}
