import {
  combineReducers
} from 'redux';
import TeacherDataReducer from './TeacherDataReducer'

const rootReducer = combineReducers({
  TeacherRes: TeacherDataReducer,
});

export default rootReducer;