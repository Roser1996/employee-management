const initialState = {
  data: [],
  nameMap: {},
  err: null,
  isLoading: false
};

const getEmployee = (state = initialState, action) => {
  switch(action.type) {
    case "GET_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "GET_EMPLOYEE_SUCCESS":
      return {
        ...state,
        data: action.data,
        nameMap: action.nameMap,
        isLoading: false
      }
    case "GET_EMPLOYEE_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    default:
      return state;
  }
}

export default getEmployee;