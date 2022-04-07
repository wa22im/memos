import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesAuth } from "../shared/constants";
import decode from "jwt-decode";

function Navbar() {
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.auth);

  
  const handleLogOut =useCallback( () => {
    dispatch({ type: actionTypesAuth.LOGOUT });
    history.push("/");
  },[dispatch,history]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
    }
  }, [location,user,handleLogOut]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user?.result?.imgUrl}
            >
              {" "}
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}{" "}
            </Typography>
            <Button onClick={handleLogOut}>Logout</Button>
          </div>
        ) : (
          <div>
            {" "}
            <Button component={Link} to="/auth">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
