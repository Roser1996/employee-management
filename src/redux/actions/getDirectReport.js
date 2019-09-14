import axios from 'axios';

import { setEmployeeToManager } from './getEmployees';

const getDirectReportRequest = () => {
  return {
    type: "GET_DIRECT_REPORT_REQUEST"
  }
}

const getDirectReportSuccess = () => {
  return {
    type: "GET_DIRECT_REPORT_SUCCESS"
  }
}

const getDirectReportFail = (err) => {
  return {
    type: "GET_DIRECT_REPORT_FAIL",
    err: err
  }
}

export const getDirectReportAction = (directReports) => {
  return (dispatch) => {
    dispatch(getDirectReportRequest());
    axios.post('http://localhost:4000/api/get/direct_report', {
      directReports: directReports
    })
      .then(res => {
        dispatch(setEmployeeToManager(res.data));
        dispatch(getDirectReportSuccess());
      })
      .catch(err => {
        dispatch(getDirectReportFail(err));
      })
  }
}