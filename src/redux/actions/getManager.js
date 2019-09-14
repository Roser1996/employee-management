import axios from 'axios';

import { setEmployeeToManager } from './getEmployees';

const getManagerRequest = () => {
  return {
    type: "GET_MANAGER_REQUEST"
  }
}

const getManagerSuccess = () => {
  return {
    type: "GET_MANAGER_SUCCESS"
  }
}

const getManagerFail = (err) => {
  return {
    type: "GET_MANAGER_FAIL",
    err: err
  }
}

export const getManagerAction = (managerId) => {
  return (dispatch) => {
    dispatch(getManagerRequest());
    axios.get(`http://localhost:4000/api/get/manager?_id=${managerId}`)
      .then(res => {
        dispatch(setEmployeeToManager([res.data]));
        dispatch(getManagerSuccess());
      })
      .catch(err => {
        dispatch(getManagerFail(err));
      })
  }
}