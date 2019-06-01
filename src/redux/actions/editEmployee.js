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
    axios.post('http://localhost:4000/api/edit/', {
      _id: employeeInfo._id,
      name: employeeInfo.name,
      title: employeeInfo.title,
      sex: employeeInfo.sex,
      startDate: employeeInfo.startDate,
      officePhone: employeeInfo.officePhone,
      cellPhone: employeeInfo.cellPhone,
      sms: employeeInfo.sms,
      email: employeeInfo.email,
      manager: employeeInfo.manager,
    })
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