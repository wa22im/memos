import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../shared/input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { actionTypesAuth } from "../shared/constants";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSignup, setisSignup] = useState(false);
  const [form, setForm] = useState(initialState);

  const history = useHistory();
  const handleSubmit = (e) => {


    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(form, history));
    } else {
      dispatch(signIn(form, history));
    }
  };
  const googleSuccessHandle = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: actionTypesAuth.AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailHandle = (err) => {
    console.log(err);
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.Avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Sign up " : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name={"firstName"}
                  label={"First Name"}
                  half
                  type="text"
                  autoFocusBool={true}
                  handleChange={handleChange} 
                  value={form.firstName}
                ></Input>
                <Input
                  name={"lastName"}
                  label={"Last Name"}
                  half
                  type="text"
                  autoFocusBool={true}
                  handleChange={handleChange} 
                  value={form.lastName}

                ></Input>
              </>
            )}
            <Input
              name={"email"}
              label={"Email"}
              half={false}
              type="email"
              autoFocusBool={false}
              handleChange={handleChange} 
              value={form.email}

            ></Input>

            <Input
              name={"password"}
              label={"Password"}
              half={false}
              type="password"
              autoFocusBool={false}
              handleChange={handleChange} 
              value={form.password}

            ></Input>
            {isSignup && (
              <Input
                name="confirmPassword"
                label={"Confirm password"}
                half={false}
                type="password"
                autoFocusBool={false}
                handleChange={handleChange} 
                value={form.confirmPassword}

              ></Input>
            )}
          </Grid>
          <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
            {" "}
            {isSignup ? "Sign up " : "Sign in"}
          </Button>
          <GoogleLogin
            clientId="77891800219-dm4ro95jiget5ou5c457qmkc40gsjq3d.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon></Icon>}
                variant="contained"
              >
                {" "}
                Google
              </Button>
            )}
            onSuccess={googleSuccessHandle}
            onFailure={googleFailHandle}
          ></GoogleLogin>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => setisSignup((prevState) => !prevState)}>
                {!isSignup ? "Sign up " : "Sign in"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
