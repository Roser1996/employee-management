import axios from 'axios';
import { getEmployeeAction } from './getEmployees';

const deleteEmployeeRequest = () => {
  return {
    type: "DELETE_EMPLOYEE_REQUEST"
  }
}

const deleteEmployeeSuccess = (message) => {
  return {
    type: "DELETE_EMPLOYEE_SUCCESS",
    message: message
  }
}

const deleteEmployeeFail = (err) => {
  return {
    type: "DELETE_EMPLOYEE_FAIL",
    err: err
  }
}

export const deleteEmployeeAction = (_id) => {
  return (dispatch) => {
    dispatch(deleteEmployeeRequest());
    axios.delete(`http://localhost:4000/api/delete/?_id=${_id}`)
      .then(res => {
        dispatch(deleteEmployeeSuccess(res));
        dispatch(getEmployeeAction(0));
      })
      .catch(err => {
        dispatch(deleteEmployeeFail(err));
      })
  }
}