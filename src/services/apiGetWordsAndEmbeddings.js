export async function apiGetWordsAndEmbeddings() {
  const data = await fetch(
    "https://how-ai-works-service.onrender.com/logic/word-embeddings",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await data.json();
  return json;
}
