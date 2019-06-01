const initialState = {
  employee: null,
  err: null,
  isLoading: false,
}

const editEmployee = (state = initialState, action) => {
  switch(action.type) {
    case "EDIT_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "EDIT_EMPLOYEE_SUCCESS":
      return {
        ...state,
        isLoading: false,
      }
    case "EDIT_EMPLOYEE_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    case "EDIT_EMPLOYEE_INFO":
      return {
        ...state,
        employee: action.employee
      }
    default: 
      return state;
  }
}

export default editEmployee;