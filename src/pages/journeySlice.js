const initialState = {
  sentence: "",
  tokens: [],
  data: [],
  QKV: {},
  dotProduct: {},
  softmax: {},
  loading: false,
};

export default function journeySlice(state = initialState, action) {
  switch (action.type) {
    case "SET_SENTENCE": {
      return {
        ...state,
        sentence: action.payload,
        tokens: action.payload.split(" "),
      };
    }
    case "SET_DATA": {
      return {
        ...state,
        data: action.payload,
      };
    }
    case "RESET_JOURNEY_STATE": {
      return initialState;
    }
    case "SET_QKV": {
      return {
        ...state,
        QKV: action.payload,
      };
    }
    case "SET_DOT_PRODUCT": {
      return {
        ...state,
        dotProduct: action.payload,
      };
    }
    case "SET_SOFTMAX": {
      return {
        ...state,
        softmax: action.payload,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function setSentence(sentence) {
  return { type: "SET_SENTENCE", payload: sentence };
}

export function getJourneyState(state) {
  return state.journey;
}

export function setData(data) {
  return { type: "SET_DATA", payload: data };
}

export function resetJourneyState() {
  return { type: "RESET_JOURNEY_STATE" };
}

export function setQKV(QKV) {
  return { type: "SET_QKV", payload: QKV };
}

export function setDotProduct(dotProduct) {
  return { type: "SET_DOT_PRODUCT", payload: dotProduct };
}

export function setSoftmax(softmax) {
  return { type: "SET_SOFTMAX", payload: softmax };
}

export function getPairs(state) {
  const { tokens, QKV, softmax } = state;
  const pairs = {};
  tokens.forEach((key) => {
    tokens.forEach((key2) => {
      const attentionKey = `${key}>${key2}`;
      pairs[attentionKey] = softmax[attentionKey];
    });
  });
  return pairs;
}

export function getValueData(state) {
  const { tokens, QKV, softmax } = state;
  const valueData = {};
  for (const key in QKV) {
    if (key.endsWith("_v")) {
      valueData[key] = QKV[key].data; // or qkvMap[key].data if you only want the array
    }
  }
  return valueData;
}

export function getWeighedSum(state) {
  const { tokens, QKV, softmax } = state;
  const valueData = getValueData(state);
  const weightedSum = {};

  // Calculate weighted sum for each token
  tokens.forEach((token) => {
    // Initialize weighted sum array for this token
    weightedSum[token] = new Array(3).fill(0); // Assuming 3-dimensional vectors

    // For each other token, add its weighted value vector
    tokens.forEach((otherToken) => {
      const attentionKey = `${token}>${otherToken}`;
      const attentionWeight = softmax[attentionKey];
      const valueKey = `${otherToken}_v`;
      const valueVector = valueData[valueKey];

      // Add weighted value vector to the sum
      for (let i = 0; i < 3; i++) {
        weightedSum[token][i] += attentionWeight * valueVector[i];
      }
    });
  });
  return weightedSum;
}

export function setLoading(loading) {
  return { type: "SET_LOADING", payload: loading };
}
