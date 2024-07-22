import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserDialog = ({
  open,
  closePopup,
  title,
  handleSubmit,
  handleProfilePictureChange,
  imagePreview,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  phone,
  handlePhoneChange,
  gender,
  setGender,
  showPassword,
  handleClickShowPassword,
  showConfirmPassword,
  handleClickShowConfirmPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isSubmitDisabled,
}) => (
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
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </Button>
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Profile Preview"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            </Box>
          )}
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
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            color="primary"
            disabled={isSubmitDisabled}
          >
            Save
          </Button>
        </Stack>
      </form>
    </DialogContent>
  </Dialog>
);

export default UserDialog;
