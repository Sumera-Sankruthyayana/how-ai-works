export default function MainHead() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white lg:text-5xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          How Does AI Understand?
        </span>
      </h2>
      {/* <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p> */}
      <hr className="w-12 lg:w-48 h-1 mx-auto my-1 bg-gray-300 border-0 rounded-sm md:my-1 dark:bg-gray-700" />
    </div>
  );
}
