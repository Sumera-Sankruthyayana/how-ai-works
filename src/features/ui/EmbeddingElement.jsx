export default function EmbeddingElement({ value, index }) {
  return (
    <span
      className={`${
        index === 0
          ? "text-red-500"
          : index === 1
          ? "text-green-500"
          : "text-blue-500"
      }`}
    >
      {value}
    </span>
  );
}
