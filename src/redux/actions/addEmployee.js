import axios from 'axios';

import { addTempEmployee } from './getEmployees';

const addEmployeeRequest = () => {
  return {
    type: "ADD_EMPLOYEE_REQUEST"
  }
}

const addEmployeeSuccess = () => {
  return {
    type: "ADD_EMPLOYEE_SUCCESS"
  }
}

const addEmployeeFail = (err) => {
  return {
    type: "ADD_EMPLOYEE_FAIL",
    err: err
  }
}

export const addEmployeeAction = (employeeInfo, callback) => {
  return (dispatch) => {
    dispatch(addEmployeeRequest());
    axios.post('http://localhost:4000/api/add', employeeInfo)
      .then(res => {
        dispatch(addEmployeeSuccess());
        addTempEmployee(res.data);
        callback();
      })
      .catch(err => {
        dispatch(addEmployeeFail(err));
      })
  }
}