import axios from 'axios';
import {
  AddRequest,
  DeleteRequest,
  EditRequest,
  getAllRequestFail,
  getAllRequestSuccess,
  getbycodesuccess,
  makeRequest,
} from './Action';
import { toast } from 'react-toastify';

export const GetAllAccounts = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(() => {
      // console.log('Fetching data...');
      axios
        .get('https://users-api-beryl.vercel.app/api/user')
        .then((res) => {
          // console.log('Response received:', res);
          const _list = res.data;
          dispatch(getAllRequestSuccess(_list));
        })
        .catch((err) => {
          // console.error('Request failed:', err);
          dispatch(getAllRequestFail(err.message));
        });
    }, 1000);
  };
};

export const CreateUser = (userlist) => {
  return (dispatch) => {
    dispatch(makeRequest());
    // console.log('Fetching data...');
    axios
      .post('https://users-api-beryl.vercel.app/api/user', userlist)
      .then(() => {
        // console.log('Response received:', res);
        //   const _list = res.data;
        dispatch(AddRequest(userlist));
        toast.success('Account Successfully Created!');
      })
      .catch((err) => {
        // console.error('Request failed:', err);
        dispatch(getAllRequestFail(err.message));
        toast.error('Failed to create account' + err.message);
      });
  };
};

export const GetUserbyCode = (code) => {
  return (dispatch) => {
    //   dispatch(makeRequest());
    // console.log('Fetching user by code');
    axios
      .get('https://users-api-beryl.vercel.app/api/user/' + code)
      .then((res) => {
        // console.log('Response received:', res);
        const _obj = res.data;
        dispatch(getbycodesuccess(_obj));
      })
      .catch((err) => {
        // console.error('Request failed:', err);
        //   dispatch(getAllRequestFail(err.message));
        toast.error('Failed to fetch the data: ' + err.message);
      });
  };
};

export const EditUser = (userlist) => {
  return (dispatch) => {
    dispatch(makeRequest());
    // console.log('Fetching data...');
    axios
      .put(
        'https://users-api-beryl.vercel.app/api/user/' + userlist.id,
        userlist
      )
      .then(() => {
        // console.log('Response received:', res);
        //   const _list = res.data;
        dispatch(EditRequest(userlist));
        toast.success('Account Successfully Updated!');
      })
      .catch((err) => {
        // console.error('Request failed:', err);
        dispatch(getAllRequestFail(err.message));
        toast.error('Failed to update account' + err.message);
      });
  };
};

export const DeleteUser = (code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    // console.log('Fetching data...');
    axios
      .delete('http://localhost:8000/user/' + code)
      .then(() => {
        // console.log('Response received:', res);
        //   const _list = res.data;
        dispatch(DeleteRequest(code));
        toast.success('Account Successfully Removed!');
      })
      .catch((err) => {
        // console.error('Request failed:', err);
        dispatch(getAllRequestFail(err.message));
        toast.error('Failed to remove account' + err.message);
      });
  };
};
