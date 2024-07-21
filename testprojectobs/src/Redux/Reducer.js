import {
  MAKE_REQ,
  OPEN_POPUP,
  REQ_ADD_SUCC,
  REQ_DELETE_SUCC,
  REQ_EDIT_SUCC,
  REQ_GETALL_FAIL,
  REQ_GETALL_SUCC,
  REQ_GETBYCODE_SUCC,
} from "./ActionType";

export const initialstate = {
  isloading: false,
  userlist: [],
  userdata: {},
  errormessage: "",
};

export const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case MAKE_REQ:
      return {
        ...state,
        isloading: true,
      };
    case REQ_GETALL_SUCC:
      return {
        ...state,
        isloading: false,
        userlist: action.payload,
      };
    case REQ_GETALL_FAIL:
      return {
        ...state,
        isloading: false,
        userlist: [],
        errormessage: action.payload,
      };
    case REQ_ADD_SUCC:
      const _inputdata = { ...action.payload };
      const _maxid = Math.max(...state.userlist.map((o) => o.id));
      _inputdata.id = _maxid + 1;
      return {
        ...state,
        userlist: [...state.userlist, _inputdata],
      };
    case OPEN_POPUP:
      return {
        ...state,
        userdata: {},
      };
    case REQ_GETBYCODE_SUCC:
      return {
        ...state,
        userdata: action.payload,
      };
    case REQ_EDIT_SUCC:
      const _data = { ...action.payload };
      const _updatedData = state.userlist.map((item) => {
        return item.id === _data.id ? _data : item;
      });
      return {
        ...state,
        userlist: _updatedData,
      };
    case REQ_DELETE_SUCC:
      const _selectData = state.userlist.filter((userlist) => {
        return userlist.id !== action.payload;
      });
      return {
        ...state,
        userlist: _selectData,
      };
    default:
      return state;
  }
};
