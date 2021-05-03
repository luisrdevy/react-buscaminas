type UIAction =
  | { type: "win"; payload: boolean }
  | { type: "instructions"; payload: boolean }
  | { type: "config"; payload: boolean };

type UIState = {
  win: boolean;
  instructions: boolean;
  config: boolean;
};

export const UIReducer = (state: UIState, action: UIAction) => {
  switch (action.type) {
    case "win":
      return { ...state, win: action.payload };
    case "instructions":
      return { ...state, instructions: action.payload };
    case "config":
      return { ...state, config: action.payload };
  }
};

export const getUIInitialState = (): UIState => ({
  win: false,
  config: false,
  instructions: false,
});
