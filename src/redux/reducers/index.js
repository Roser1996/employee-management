import { combineReducers } from 'redux';
import getEmployee from './get';
import deleteEmployee from './delete';
import editEmployee from './edit';
import addEmployee from './add';
import avatarUpload from './avatar';
import getEmployeeId from './getId';

const reducers = combineReducers({
  getEmployee,
  deleteEmployee,
  editEmployee,
  addEmployee,
  avatarUpload,
  getEmployeeId,
});

export default reducers;