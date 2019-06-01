const initialState = {
  err: null,
  isLoading: false
}

const addEmployee = (state = initialState, action) => {
  switch(action.type) {
    case "ADD_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "ADD_EMPLOYEE_SUCCESS":
      return {
        ...state,
        isLoading: false
      }
    case "ADD_EMPLOYEE_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    default:
      return state;
  }
}

export default addEmployee;