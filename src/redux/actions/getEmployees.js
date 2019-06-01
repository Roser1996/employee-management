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

export const getEmployeeAction = (num) => {
  return (dispatch) => {
    dispatch(getEmployeeRequest());
    axios.get(`http://localhost:4000/api/get?pageStart=${num}`) 
      .then(res => {
        dispatch(getEmployeeSuccess(res.data));
      })
      .catch(err => {
        dispatch(getEmployeeFail(err));
      });
  }
}