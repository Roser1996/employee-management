import axios from 'axios';

const getEmployeeIdRequest = () => {
  return {
    type: "GET_EMPLOYEE_ID_REQUEST"
  }
}

const getEmployeeIdSuccess = (data) => {
  return {
    type: "GET_EMPLOYEE_ID_SUCCESS",
    idList: data
  }
}

const getEmployeeIdFail = (err) => {
  return {
    type: "GET_EMPLOYEE_ID_FAIL",
    err: err
  }
}

export const getEmployeeIdAction = (employeeId, callback) => {
  return (dispatch) => {
    dispatch(getEmployeeIdRequest());
    axios.get(`http://localhost:4000/api/get/id?_id=${employeeId}`)
      .then(res => {
        dispatch(getEmployeeIdSuccess(res.data));
        callback();
      })
      .catch(err => {
        dispatch(getEmployeeIdFail(err));
      })
  }
}