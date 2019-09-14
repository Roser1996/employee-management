const initialState = {
  err: null,
  isLoading: false
}

const getDirectReport = (state = initialState, action) => {
  switch(action.type) {
    case "GET_DIRECT_REPORT_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "GET_DIRECT_REPORT_SUCCESS":
      return {
        ...state,
        isLoading: false
      }
    case "GET_DIRECT_REPORT_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    default:
      return state;
  }
}

export default getDirectReport;