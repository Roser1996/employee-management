const initialState = {
  data: [],
  nameMap: {},
  search: "",
  sortOrder: "",
  sortField: "",
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
        data: [ ...state.data, ...action.data],
        nameMap: { ...state.nameMap, ...action.nameMap} ,
        isLoading: false
      }
    case "GET_EMPLOYEE_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    case "RESET_EMPLOYEE_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "RESET_EMPLOYEE_SUCCESS":
      return {
        ...state,
        data: action.data,
        nameMap: action.nameMap,
        isLoading: false
      }
    case "RESET_EMPLOYEE_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    case "SET_EMPLOYEE_TO_MANAGER": 
      return {
        ...state,
        data: action.data
      }
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        search: action.search
      }
    case "SET_SORT_ORDER":
      return {
        ...state,
        sortOrder: action.sortOrder
      }
    case "SET_SORT_FIELD":
      return {
        ...state,
        sortField: action.sortField
      }
    case "ADD_TEMP_EMPLOYEE":
      return {
        ...state,
        data: state.data.push(action.employee),
        nameMap: { ...state.nameMap, ...action.nameMap }
      }
    default:
      return state;
  }
}

export default getEmployee;