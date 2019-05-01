const intialState = {
  notes: ["gvgh"]
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        notes: [...state.notes, action.value]
      };
    case "FETCH":
      return { notes: action.value };
    case "DELETE":
      return { notes: action.value };
    default:
      return state;
  }
};

export default reducer;
