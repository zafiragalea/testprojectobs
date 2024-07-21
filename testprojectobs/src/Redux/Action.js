import {
  MAKE_REQ,
  REQ_GETALL_SUCC,
  REQ_GETALL_FAIL,
  REQ_ADD_SUCC,
  OPEN_POPUP,
  REQ_GETBYCODE_SUCC,
  REQ_EDIT_SUCC,
  REQ_DELETE_SUCC,
} from "./ActionType";

export const makeRequest = () => {
  return {
    type: MAKE_REQ,
  };
};

export const getAllRequestSuccess = (userlist) => {
  return {
    type: REQ_GETALL_SUCC,
    payload: userlist,
  };
};

export const getAllRequestFail = (error) => {
  return {
    type: REQ_GETALL_FAIL,
    payload: error,
  };
};

export const AddRequest = (userlist) => {
  return {
    type: REQ_ADD_SUCC,
    payload: userlist,
  };
};

export const OpenPopup = () => {
  return {
    type: OPEN_POPUP,
  };
};

export const getbycodesuccess = (userlist) => {
  return {
    type: REQ_GETBYCODE_SUCC,
    payload: userlist,
  };
};

export const EditRequest = (userlist) => {
  return {
    type: REQ_EDIT_SUCC,
    payload: userlist,
  };
};

export const DeleteRequest = (code) => {
  return {
    type: REQ_DELETE_SUCC,
    payload: code,
  };
};
