import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CreateUser,
  DeleteUser,
  EditUser,
  GetAllAccounts,
  GetUserbyCode,
} from "../Redux/ActionCreater";
import { ThreeDots } from "react-loader-spinner";

const User = ({ userstate, loaduser }) => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "username", name: "Username" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "gender", name: "Gender" },
    { id: "password", name: "Password" },
    { id: "action", name: "Action" },
  ];

  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  //   const [lastId, setLastId] = useState(0);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rowPage, setRowPage] = useState(10);
  const [page, setPage] = useState(0);
  const [editUser, setEditUser] = useState(false);
  const [title, setTitle] = useState("Create User");

  const editData = useSelector((state) => state.user.userdata);

  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      setId(editData.id);
      setName(editData.name);
      setUsername(editData.username);
      setEmail(editData.email);
      setPhone(editData.phone);
      setGender(editData.gender);
      setPassword(editData.password);
      setConfirmPassword("");
    } else {
      resetFields();
    }
  }, [editData]);

  const resetFields = () => {
    setId(0);
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setGender("");
    setPassword("");
    setConfirmPassword("");
  };

  const closePopup = () => {
    resetFields();
    setOpen(false);
  };

  const openPopup = () => {
    setOpen(true);
    // dispatch(openPopup());
  };

  const addUser = () => {
    setEditUser(false);
    setTitle("Create User");
    openPopup();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isSubmitDisabled =
    !name || !username || !email || !gender || !password || !confirmPassword;

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    const phoneRegex = /^\d{0,12}$/;
    if (phoneRegex.test(phoneValue)) {
      setPhone(phoneValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(phone)) {
      setAlertMessage("Phone number must be between 10 and 12 digits!");
      setAlertOpen(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setAlertOpen(true);
      return;
    }
    // const newId = lastId + 1;
    const newUser = {
      //   id: newId,
      id,
      name,
      username,
      email,
      phone,
      gender,
      password,
    };
    if (editUser) {
      dispatch(EditUser(newUser));
    } else {
      dispatch(CreateUser(newUser));
    }
    setUsers([...users, newUser]);
    // setLastId(newId);
    closePopup();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handlePageChange = (event, newpage) => {
    setPage(newpage);
  };

  const handleRowChange = (event) => {
    setRowPage(event.target.value);
    setPage(0);
  };

  const handleEdit = (code) => {
    setEditUser(true);
    setTitle("Edit User");
    setOpen(true);
    dispatch(GetUserbyCode(code));
  };

  const handleDelete = (code) => {
    if (window.confirm("Do you want to delete this account?")) {
      dispatch(DeleteUser(code));
    }
  };

  useEffect(() => {
    // console.log("test data");
    loaduser();
  }, [loaduser]);

  return userstate.isloading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#f01a89"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  ) : userstate.errormessage ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        padding={2}
        border={1}
        borderColor="grey.500"
        borderRadius={1}
        boxShadow={3}
      >
        <Typography variant="h6" color="textPrimary">
          {userstate.errormessage}
        </Typography>
      </Box>
    </Box>
  ) : (
    <div>
      <h1 style={{ margin: "4%", textAlign: "center" }}>USER ACCOUNT</h1>
      <div
        style={{
          margin: "4%",
          marginLeft: "auto",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={addUser}
          style={{ backgroundColor: "#f01a89" }}
        >
          Add new user
        </Button>
      </div>

      <Paper sx={{ margin: "4%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      backgroundColor: "#6B2D5C",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userstate.userlist &&
                userstate.userlist
                  .slice(page * rowPage, page * rowPage + rowPage)
                  .map((row, i) => (
                    <TableRow
                      key={i}
                      style={{
                        backgroundColor:
                          i % 2 === 0 ? "white" : "rgba(226, 194, 144, 0.4)",
                      }}
                    >
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
                          onClick={(e) => handleEdit(row.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={(e) => handleDelete(row.id)}
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
          count={userstate.userlist.length}
          component={"div"}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowChange}
        />
      </Paper>

      <Dialog open={open} onClose={closePopup} maxWidth="sm">
        <DialogTitle>
          <span>{title}</span>
          <IconButton style={{ float: "right" }} onClick={closePopup}>
            <CloseIcon color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                label="Name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#ff5376",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5376",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#ff5376",
                    },
                  },
                }}
              />
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                label="Username"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#ff5376",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5376",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#ff5376",
                    },
                  },
                }}
              />
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                label="Email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#ff5376",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5376",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#ff5376",
                    },
                  },
                }}
              />
              <TextField
                value={phone}
                onChange={handlePhoneChange}
                variant="outlined"
                label="Phone"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#ff5376",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5376",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#ff5376",
                    },
                  },
                }}
              />
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="Male"
                  control={
                    <Radio
                      sx={{
                        color: "#ff5376",
                        "&.Mui-checked": { color: "#ff5376" },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={
                    <Radio
                      sx={{
                        color: "#ff5376",
                        "&.Mui-checked": { color: "#ff5376" },
                      }}
                    />
                  }
                  label="Female"
                />
              </RadioGroup>
              <TextField
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#ff5376",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5376",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#ff5376",
                    },
                  },
                }}
              />
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                label="Confirm Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#ff5376",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5376",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#ff5376",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitDisabled}
                sx={{
                  backgroundColor: isSubmitDisabled ? "gray" : "#ff5376",
                  "&:disabled": {
                    backgroundColor: "gray",
                  },
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    userstate: state.user,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    loaduser: () => dispatch(GetAllAccounts()),
  };
};

export default connect(mapStatetoProps, mapDispatchProps)(User);
