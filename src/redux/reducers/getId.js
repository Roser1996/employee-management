const initialState = {
  idList: [],
  err: null,
  isLoading: false
}

const getEmployeeId = (state = initialState, action) => {
  switch(action.type) {
    case "GET_EMPLOYEE_ID_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "GET_EMPLOYEE_ID_SUCCESS":
      return {
        ...state,
        idList: action.idList,
        isLoading: false
      }
    case "GET_EMPLOYEE_ID_FAIL":
      return {
        ...state, 
        err: action.err,
        isLoading: false
      }
    default:
      return state;
  }
}

export default getEmployeeId;