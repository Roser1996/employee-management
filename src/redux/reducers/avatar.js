const initialState = {
  message: null,
  err: null,
  isLoading: false
}

const avatarUpload = (state = initialState, action) => {
  switch(action.type) {
    case "UPLOAD_AVATAR_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "UPLOAD_AVATAR_SUCCESS":
      return {
        ...state,
        message: action.message,
        isLoading: false
      }
    case "UPLOAD_AVATAR_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      }
    default: 
      return state;
  }
}

export default avatarUpload;