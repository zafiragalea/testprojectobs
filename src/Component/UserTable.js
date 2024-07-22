import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteUser,
  GetAllAccounts,
  GetUserbyCode,
} from '../Redux/ActionCreater';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  TablePagination,
} from '@mui/material';

const UserTable = ({ userstate = {} }) => {
  // Default empty object
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.user.userlist);
  const isloading = useSelector((state) => state.user.isloading);

  const columns = [
    { id: 'no', name: 'No' },
    { id: 'profilePicture', name: 'Profile Picture' },
    { id: 'id', name: 'Id' },
    { id: 'name', name: 'Name' },
    { id: 'username', name: 'Username' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'gender', name: 'Gender' },
    { id: 'password', name: 'Password' },
    { id: 'action', name: 'Action' },
  ];

  const [rowPage, setRowPage] = useState(10);
  const [page, setPage] = useState(0);
  const [setEditUser] = useState(false);
  const [setTitle] = useState('Create User');
  const [setOpen] = useState(false);

  const sortedUserList = (userstate.userlist || [])
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleEdit = (code) => {
    setEditUser(true);
    setTitle('Edit User');
    setOpen(true);
    dispatch(GetUserbyCode(code));
  };

  const handleDelete = (code) => {
    if (window.confirm('Do you want to delete this account?')) {
      dispatch(DeleteUser(code));
    }
  };

  const handlePageChange = (event, newpage) => {
    setPage(newpage);
  };

  const handleRowChange = (event) => {
    setRowPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (!userlist.length && !isloading) {
      dispatch(GetAllAccounts());
    }
  }, [dispatch, userlist, isloading]);

  if (isloading) {
    return <CircularProgress />;
  }

  if (!userlist || userlist.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <Paper sx={{ margin: '4%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    backgroundColor: '#6B2D5C',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUserList &&
              sortedUserList
                .slice(page * rowPage, page * rowPage + rowPage)
                .map((row, i) => (
                  <TableRow
                    key={i}
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? 'white' : 'rgba(226, 194, 144, 0.4)',
                    }}
                  >
                    <TableCell>{page * rowPage + i + 1}</TableCell>
                    <TableCell>
                      {row.profilePicture ? (
                        <img
                          src={row.profilePicture}
                          alt="Profile"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <div>No Picture</div>
                      )}
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.password}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={(e) => {
                          e.preventDefault(); // Example usage of the event object
                          handleEdit(row.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(row.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 20, 50, 100]}
        rowsPerPage={rowPage}
        page={page}
        count={userstate.userlist ? userstate.userlist.length : 0} // Handle undefined case
        component={'div'}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowChange}
      />
    </Paper>
  );
};

export default UserTable;
