import axios from 'axios';

const editEmployeeRequest = () => {
  return {
    type: "EDIT_EMPLOYEE_REQUEST"
  }
}

const editEmployeeSuccess = () => {
  return {
    type: "EDIT_EMPLOYEE_SUCCESS" 
  }
}

const editEmployeeFail = (err) => {
  return {
    type: "EDIT_EMPLOYEE_FAIL",
    err: err
  }
}

export const editEmployeeInfo = (employeeInfo) => {
  return {
    type: "EDIT_EMPLOYEE_INFO",
    employee: employeeInfo
  }
}

export const editEmployeeAction = (employeeInfo, callback) => {
  return (dispatch) => {
    dispatch(editEmployeeRequest());
    console.log(employeeInfo.avatarUrl);
    axios.post('http://localhost:4000/api/edit/', employeeInfo)
    .then(res => {
      dispatch(editEmployeeSuccess());
      dispatch(editEmployeeInfo(employeeInfo));
      callback();
    })
    .catch(err => {
      dispatch(editEmployeeFail(err));
    })
  }
}