const API_URL = "https://how-ai-works-service.onrender.com";

export async function getW_Q() {
  const response = await fetch(`${API_URL}/logic/W_Q_Matrix`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
}

export async function getW_K() {
  const response = await fetch(`${API_URL}/logic/W_K_Matrix`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
}

export async function getW_V() {
  const response = await fetch(`${API_URL}/logic/W_V_Matrix`, {
    method: "GET",
  });
  const json = await response.json();
  return json;
}

export async function computeQKV({ tokens }) {
  const requestBody = {
    tokens: [...tokens],
  };
  const response = await fetch(`${API_URL}/logic/computeQKV`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong computing QKV");
  }

  return response.json();
}

export async function dotProduct({ tokens }) {
  const requestBody = {
    tokens: [...tokens],
  };
  const response = await fetch(`${API_URL}/logic/dotProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong dot product");
  }

  return response.json();
}

export async function softmax({ dotProduct }) {
  const requestBody = {
    dotProductMap: dotProduct,
  };
  const response = await fetch(`${API_URL}/logic/softmax`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong softmax");
  }

  return response.json();
}

export async function computSoftMaxProbability({ outputVector }) {
  const requestBody = {
    outputVector: [...outputVector],
  };
  const response = await fetch(`${API_URL}/logic/computeSoftmaxProbabilities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Something went wrong computing softmax probability"
    );
  }

  return response.json();
}
