import React from "react";
import * as Realm from "realm-web";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Card,
  Typography,
  InputAdornment,
  
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRealmApp } from "../components/RealmApp";
import { toggleBoolean } from "../utils";
import { useErrorAlert } from "../hooks/useErrorAlert";
import { Stack } from "@mui/material";




export function WelcomePage() {
  const realmApp = useRealmApp();
  // Track whether the user is logging in or signing up for a new account
  const [isSignup, setIsSignup] = React.useState(false);
  const [isStarted, setStarted] = React.useState(false);

  const toggleIsSignup = () => {
    clearErrors();
    setIsSignup(toggleBoolean);
  };
  // Authentication errors
  const noErrors = {
    email: null,
    password: null,
    other: null,
  };
  const [error, setError] = React.useState(noErrors);
  const clearErrors = () => setError(noErrors);
  const NonAuthErrorAlert = useErrorAlert({
    error: error.other,
    clearError: () => {
      setError((prevError) => ({ ...prevError, other: null }));
    },
  });
  // Manage password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(toggleBoolean);

  const onFormSubmit = async ({ email, password }) => {
    clearErrors();
    try {
      if (isSignup) {
        await realmApp.emailPasswordAuth.registerUser(email, password);
      }
      await realmApp.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      handleAuthenticationError(err, setError);
    }
  };

  return (
   
    <Container fixed className="main-welcome-container" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
      {
        !isStarted ?
          <Stack direction="row" spacing={10} style={{marginLeft:200}}>
             {/* <link href="https://fonts.google.com/specimen/Gloria+Hallelujah?category=Display,Handwriting"></link> */}
         
            <div className="left-side-container" style={{width:400}}>
              <img src="https://cdn.discordapp.com/attachments/1043592944504017066/1043728908941545472/DALLE_2022-11-19_20.24.54.png" width={400}></img>
            </div>
            <div className="right-side-container" style={{ display:'flex', flexDirection:'column',width:400}}>
              <img src="https://cdn.discordapp.com/attachments/1043592944504017066/1043715156800184340/SBLogoFull.png" width={400}></img>
              <div className="welcome-text-container">
              StuddyBuddy is an interactive tutoring app designed to help people of various backgrounds learn together. 
              The app pairs users based on their learning goals, and then provides a forum for them to work together 
              and learn from each other.
              </div>
              <Button
              variant="contained"
              color="primary"
              onClick={() => setStarted(true)}
            >
              Get started
            </Button>
            </div>
            
            {/* <Typography component="p" variant="h5">
              Welcome, Buddy
            </Typography> */}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => setStarted(true)}
            >
              Get started
            </Button> */}
          
          </Stack>
          :
          <Card className="auth-card" variant="outlined">
            <form
              className="auth-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const { email, password } = Object.fromEntries(formData.entries());
                onFormSubmit({ email, password });
              }}
            >
              <Typography component="h2" variant="h4" gutterBottom>
                {isSignup ? "Sign Up" : "Log In"}
              </Typography>
              <NonAuthErrorAlert />
              <TextField
                id="input-email"
                name="email"
                label="Email Address"
                variant="outlined"
                error={Boolean(error.email)}
                helperText={error.email ?? ""}
              />
              <TextField
                id="input-password"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                variant="outlined"
                error={Boolean(error.password)}
                helperText={error.password ?? ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained" color="primary">
                {isSignup ? "Create Account" : "Log In"}
              </Button>
              <button
                type="button"
                className="link-button"
                onClick={() => toggleIsSignup()}
              >
                {isSignup
                  ? "Already have an account? Log In"
                  : "Sign up for an account"}
              </button>
            </form>
          </Card>
      }
    </Container>
  );
}

function handleAuthenticationError(err, setError) {
  const handleUnknownError = () => {
    setError((prevError) => ({
      ...prevError,
      other: "Something went wrong. Try again in a little bit.",
    }));
    console.warn(
      "Something went wrong with a Realm login or signup request. See the following error for details."
    );
    console.error(err);
  };
  if (err instanceof Realm.MongoDBRealmError) {
    const { error, statusCode } = err;
    const errorType = error || statusCode;
    switch (errorType) {
      case "invalid username":
        setError((prevError) => ({
          ...prevError,
          email: "Invalid email address.",
        }));
        break;
      case "invalid username/password":
      case "invalid password":
      case 401:
        setError((prevError) => ({
          ...prevError,
          password: "Incorrect password.",
        }));
        break;
      case "name already in use":
      case 409:
        setError((prevError) => ({
          ...prevError,
          email: "Email is already registered.",
        }));
        break;
      case "password must be between 6 and 128 characters":
      case 400:
        setError((prevError) => ({
          ...prevError,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
      default:
        handleUnknownError();
        break;
    }
  } else {
    handleUnknownError();
  }
}
