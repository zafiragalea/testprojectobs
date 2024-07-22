import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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

interface UserProps {
  userstate: any;
  loaduser: () => void;
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  profilePicture?: string;
}

const User: React.FC<UserProps> = ({ userstate, loaduser }) => {
  const columns = [
    { id: "no", name: "No" },
    { id: "profilePicture", name: "Profile Picture" },
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
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [rowPage, setRowPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Create User");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const editData = useSelector((state: any) => state.user.userdata);

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
      setProfilePicture(null);
      setImagePreview(editData.profilePicture || "");
    } else {
      resetFields();
    }
  }, [editData]);

  const resetFields = () => {
    setId("");
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setGender("");
    setPassword("");
    setConfirmPassword("");
    setProfilePicture(null);
    setImagePreview("");
  };

  const closePopup = () => {
    resetFields();
    setOpen(false);
  };

  const openPopup = () => {
    setOpen(true);
  };

  const addUser = () => {
    setEditUser(false);
    setTitle("Create User");
    openPopup();
  };

  const sortedUserList = userstate.userlist
    .slice()
    .sort((a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isSubmitDisabled =
    !name || !username || !email || !gender || !password || !confirmPassword;

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const phoneRegex = /^\d{0,12}$/;
    if (phoneRegex.test(phoneValue)) {
      setPhone(phoneValue);
    }
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(file); 
        setImagePreview(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    const newUser: User = {
      id,
      name,
      username,
      email,
      phone,
      gender,
      password,
      profilePicture: imagePreview,
    };
    if (editUser) {
      dispatch(EditUser(newUser));
    } else {
      dispatch(CreateUser(newUser));
    }
    setUsers([...users, newUser]);
    closePopup();
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handlePageChange = (event: unknown, newpage: number) => {
    setPage(newpage);
  };

  const handleRowChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (code: string) => {
    setEditUser(true);
    setTitle("Edit User");
    setOpen(true);
    dispatch(GetUserbyCode(code));
  };

  const handleDelete = (code: string) => {
    if (window.confirm("Do you want to delete this account?")) {
      dispatch(DeleteUser(code));
    }
  };

  useEffect(() => {
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
              {sortedUserList &&
                userstate.userlist &&
                userstate.userlist
                  .slice(page * rowPage, page * rowPage + rowPage)
                  .map((row: User, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell style={{ textAlign: "center" }}>
                        {page * rowPage + index + 1}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <img
                          src={row.profilePicture}
                          alt="Profile"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.id}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.name}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.username}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.email}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.phone}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.gender}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.password}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(row.id)}
                          style={{ backgroundColor: "#00A36C", margin: "2%" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleDelete(row.id)}
                          style={{ backgroundColor: "#FF2400", margin: "2%" }}
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
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={userstate.userlist.length}
          rowsPerPage={rowPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowChange}
        />
      </Paper>

      <Dialog open={open} onClose={closePopup}>
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closePopup}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ marginTop: 2 }}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={handlePhoneChange}
                fullWidth
                required
              />
              <FormControlLabel
                control={
                  <RadioGroup
                    row
                    aria-labelledby="gender-radio-buttons-group-label"
                    name="gender-radio-buttons-group"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                }
                label="Gender"
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="confirm-password"
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile-picture-upload">
                <Button variant="contained" color="primary" component="span">
                  Upload Profile Picture
                </Button>
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "10px" }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitDisabled}
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
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userstate: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  loaduser: () => dispatch(GetAllAccounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
