import * as types from "./actionTypes";

export function doTeacherData(data) {
  return {
    type: types.DO_TEACHERDATA,
    data,
  };
}

export function doTeacherDataRes(user) {
  return {
    type: types.DO_TEACHERDATA_RES,
    user,
  };
}