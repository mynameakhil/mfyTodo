const intialState = {
  loading: false,
  data: [],
  error: null
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "FETCH_NOTES":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "FETCH_NOTES_SUCCESS":
      return {
        ...state.notes,
        loading: false,
        data: action.data
      };
    case "FETCH_NOTES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case "DELETE_NOTES":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "DELETE_NOTES_SUCCESS":
      return {
        ...state.notes,
        loading: false,
        data: action.data
      };
    case "DELETE_NOTES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case "EDIT_NOTES":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "EDIT_NOTES_SUCCESS":
      return {
        ...state.notes,
        loading: false,
        data: action.data
      };
    case "EDIT_NOTES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case "ADD_NOTES":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "ADD_NOTES_SUCCESS":
      return {
        ...state.notes,
        loading: false,
        data: action.data
      };
    case "ADD_NOTES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
