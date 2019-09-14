import axios from 'axios';

const getEmployeeRequest = () => {
  return {
    type: "GET_EMPLOYEE_REQUEST"
  }
}

const getEmployeeSuccess = (data) => {
  return {
    type: "GET_EMPLOYEE_SUCCESS",
    data: data.employees,
    nameMap: data.employeeMap
  }
}

const getEmployeeFail = (err) => {
  return {
    type: "GET_EMPLOYEE_FAIL",
    err: err
  }
}

const resetEmployeeReuqest = () => {
  return {
    type: "RESET_EMPLOYEE_REQUEST"
  }
}

const resetEmployeeSuccess = (data) => {
  return {
    type: "RESET_EMPLOYEE_SUCCESS",
    data: data.employees,
    nameMap: data.employeeMap
  }
}

const resetEmployeeFail = (err) => {
  return {
    type: "RESET_EMPLOYEE_FAIL",
    err: err
  }
}

export const setSearchText = (text) => {
  return {
    type: "SET_SEARCH_TEXT",
    search: text
  }
}

export const setSortOrder = (order) => {
  return {
    type: "SET_SORT_ORDER",
    sortOrder: order
  }
}

export const setOrderField = (field) => {
  return {
    type: "SET_SORT_FIELD",
    sortField: field
  }
}

export const setEmployeeToManager = (data) => {
  return {
    type: "SET_EMPLOYEE_TO_MANAGER",
    data: data
  }
}

export const addTempEmployee = (employee) => {
  return {
    type: "ADD_TEMP_EMPLOYEE",
    employee: employee,
    nameMap: { [employee._id]: employee.manager }
  }
}

export const getEmployeeAction = (pageStart, employeeNum, search, sortOrder, sortField) => {
  return (dispatch) => {
    dispatch(getEmployeeRequest());
    axios.get(`http://localhost:4000/api/get?pageStart=${pageStart}&employeeNum=${employeeNum}&search=${search}&sortOrder=${sortOrder}&sortField=${sortField}`) 
      .then(res => {
        console.log(res.data);
        dispatch(getEmployeeSuccess(res.data));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  }
}

export const resetEmployeeAction = (pageStart, employeeNum, search, sortOrder, sortField) => {
  return (dispatch) => {
    dispatch(resetEmployeeReuqest());
    axios.get(`http://localhost:4000/api/get?pageStart=${pageStart}&employeeNum=${employeeNum}&search=${search}&sortOrder=${sortOrder}&sortField=${sortField}`)
      .then(res => {
        console.log(res.data);
        dispatch(resetEmployeeSuccess(res.data));
      })
      .catch(err => {
        dispatch(resetEmployeeFail(err));
      })
  }
}