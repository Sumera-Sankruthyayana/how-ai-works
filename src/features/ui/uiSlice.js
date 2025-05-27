const initialState = [
  {
    id: 0,
    title: "Start",
    description: "Introduction",
    active: true,
    done: false,
    path: "/introduction",
  },
  {
    id: 1,
    title: "Tokenization",
    description: "Split text",
    active: false,
    done: false,
    path: "/tokenization",
  },
  {
    id: 2,
    title: "Embedding",
    description: "Vector mapping",
    active: false,
    done: false,
    path: "/embedding",
  },
  {
    id: 3,
    title: "Query, Key, Value",
    description: "Create QKV vectors",
    active: false,
    done: false,
    path: "/querykeyvalue",
  },
  {
    id: 4,
    title: "Dot Product",
    description: "Score similarity",
    active: false,
    done: false,
    path: "/dotproduct",
  },
  {
    id: 5,
    title: "Softmax",
    description: "Normalize scores",
    active: false,
    done: false,
    path: "/softmax",
  },
  {
    id: 6,
    title: "Weighted Sum",
    description: "Blend values",
    active: false,
    done: false,
    path: "/weightedsum",
  },
  {
    id: 7,
    title: "Contextual Output",
    description: "Meaningful vector",
    active: false,
    done: false,
    path: "/contextualoutput",
  },
];

export default function uiSlice(state = initialState, action) {
  switch (action.type) {
    case "ui/reset": {
      return initialState;
    }
    case "ui/next": {
      return state.map((step) => {
        if (step.id === action.payload) {
          return { ...step, active: true };
        }
        if (step.id === action.payload - 1) {
          return { ...step, done: true, active: false };
        }
        return step;
      });
    }
    case "ui/previous": {
      return state.map((step) => {
        if (step.id === action.payload) {
          return { ...step, active: true };
        }
        if (step.id === action.payload + 1) {
          return { ...step, done: false, active: false };
        }
        return step;
      });
    }
    default: {
      return state;
    }
  }
}

export function reset() {
  return { type: "ui/reset" };
}

export function next(stepId) {
  return { type: "ui/next", payload: stepId };
}

export function previous(stepId) {
  return { type: "ui/previous", payload: stepId };
}

export function getCurrentStep(state) {
  return state.ui.find((step) => step.active);
}

export function getSteps(state) {
  return state.ui;
}
