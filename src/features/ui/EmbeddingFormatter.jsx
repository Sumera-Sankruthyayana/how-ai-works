import EmbeddingElement from "./EmbeddingElement";

export default function EmbeddingFormatter({ embedding }) {
  const embeddingArray = JSON.parse(embedding);
  return (
    <span>
      {"["}
      {embeddingArray.map((value, i) => (
        <span key={i}>
          <EmbeddingElement key={i} value={value} index={i} />
          {i < embeddingArray.length - 1 && ","}
        </span>
      ))}
      {"]"}
    </span>
  );
}
