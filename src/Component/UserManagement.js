import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAllAccounts,
  DeleteUser,
  CreateUser,
  EditUser,
} from '../Redux/ActionCreater';
import Loading from './Loading';
import UserTable from './UserTable';
import UserDialog from './UserDialog';
import { Stack, Button } from '@mui/material';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { userlist, isloading, errormessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(GetAllAccounts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(DeleteUser(id));
  };

  const handleSave = (user) => {
    if (user.id) {
      dispatch(EditUser(user));
    } else {
      dispatch(CreateUser(user));
    }
  };

  if (isloading) {
    return <Loading />;
  }

  if (errormessage) {
    return <div>Error: {errormessage}</div>;
  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'OPEN_POPUP' })}
        >
          Add User
        </Button>
      </Stack>
      <UserTable users={userlist} onDelete={handleDelete} onEdit={handleSave} />
      <UserDialog onSave={handleSave} />
    </div>
  );
};

export default UserManagement;
