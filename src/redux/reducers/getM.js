const initialState = {
  err: null,
  isLoading: false
}

const getManager = (state = initialState, action) => {
  switch(action.type) {
    case "GET_MANAGER_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "GET_MANAGER_SUCCESS":
      return {
        ...state,
        isLoading: false
      }
    case "GET_MANAGER_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    default:
      return state;
  }
}

export default getManager;