const initialState = {
  message: null,
  err: null,
  isLoading: false
}

const deleteEmployee = (state = initialState, action) => {
  switch(action.type) {
    case "DELETE_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "DELETE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        message: action.message,
        isLoading: false
      }
    case "DELETE_EMPLOYEE_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    default:
      return state;
  }
}

export default deleteEmployee;