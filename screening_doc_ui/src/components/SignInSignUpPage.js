import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Paper,
  Avatar,
  Link,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import { BASE_URL } from '../constants.js'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSignUpPage({ isAuthenticated, setIsAuthenticated }) {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = isSignIn ? 'sign-in' : 'sign-up'; // Adjust the endpoint names
    if (!isSignIn && (!formData.firstName || !formData.lastName)) {
      setError('First name and last ame are required.');
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    if (!isSignIn && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(`${BASE_URL}${apiEndpoint}`, formData);
      if (response["data"]["status"] === "success") {
        if (!isSignIn) {
            setInfo("Sign-up successful. Please login now.")
            setError(null)
            handleToggle()
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: ''
              })
        }
        else {
            setIsAuthenticated(true)
            navigate("/form", {state: {name: response["data"]["name"], email: response["data"]["email"], isAuthenticated: true}})
        }
      }
      else {
        setError(response["data"]["msg"])
      }
      setLoading(false)
    } catch (error) {
      console.error('API error:', error);
      setError('An error occurred. Please try again.');
      setLoading(false)
    }
  };

  return (
    <Container component="main" maxWidth="xs" align="center">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? 'Sign in' : 'Sign up'}
        </Typography>
        { !loading? (
        <form className={classes.form} onSubmit={handleSubmit}>
          {!isSignIn && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="text"
              id="firstName"
              autoComplete="first-name"
              value={formData.firstName}
              onChange={handleFormChange}
            />
          )}
          {!isSignIn && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              id="lastName"
              autoComplete="last-name"
              value={formData.lastName}
              onChange={handleFormChange}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleFormChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleFormChange}
          />
          {!isSignIn && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleFormChange}
            />
          )}
          {
            error && (
                <Alert severity="success" color="error">
                  {error}
                </Alert>
            )
          }
          {
            info && (
                <Alert severity="success" color="info">
                  {info}
                </Alert>
            )
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{"marginTop": 7}}
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" onClick={handleToggle} variant="body2">
                {isSignIn
                  ? 'Don\'t have an account? Sign Up'
                  : 'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
        ) :
        (<CircularProgress/>)
        }
      </Paper>
    </Container>
  );
}

export default SignInSignUpPage;
