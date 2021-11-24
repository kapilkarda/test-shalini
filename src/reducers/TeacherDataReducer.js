import * as types from "../action/actionTypes";
import initialState from "./initialState";

//all the user related reducers here
export default function (state = initialState.user, action) {
  //we will change the state = {} soon
  console.log("action", action)
  switch (action.type) {
    case types.DO_TEACHERDATA_RES:
      return action.user;
    default:
      return state;
  }
}