import axios from 'axios';

const uploadAvatarRequest = () => {
  return {
    type: "UPLOAD_AVATAR_REQUEST"
  }
}

const uploadAvatarSuccess = (message) => {
  return {
    type: "UPLOAD_AVATAR_SUCCESS",
    message: message
  }
}

const uploadAvatarFail = (err) => {
  return {
    type: "UPLOAD_AVATAR_FAIL",
    err: err
  }
}

export const uploadAvatarAction = (employeeInfo, operation, imageFile, callback) => {
  let data = new FormData();
  data.append('file', imageFile);
  data.append('name', 'image');
  return (dispatch) => {
    dispatch(uploadAvatarRequest());
    axios.post('http://localhost:4000/api/image/upload', data)
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          dispatch(uploadAvatarSuccess(res.data.message));
          employeeInfo.avatarUrl = res.data.url;
          operation(employeeInfo, callback);
        }
        else {
          dispatch(uploadAvatarFail(res.data.err));
        }
      })
      .catch(err => {
        dispatch(uploadAvatarFail(err));
      })
  }
}