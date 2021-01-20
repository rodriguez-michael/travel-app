import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CustomizedMenus from "./Hamburger";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import isLoggedInContext from "../../contexts/isLoggedInContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    marginLeft: "10px",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "30px",
    letterSpacing: "3px",
  },
}));

export default function ButtonAppBar({ handleLogout }) {
  const userContext = useContext(UserContext);
  const loggedInContext = useContext(isLoggedInContext);

  const classes = useStyles();

  const hist = useHistory();

  const goLogin = () => {
    hist.push("/login");
  };

  const goSignup = () => {
    hist.push("/signup");
  };

  const goLogout = () => {
    handleLogout();
    hist.push("/login");
  };

  const goFavorites = () => {
    hist.push("/favorites");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <CustomizedMenus />
          <Typography
            component={Link}
            to={"/"}
            variant="h6"
            className={classes.title}
            style={{ width: "30px", fontFamily: "Lobster" }}
          >
            Travvy
          </Typography>

          {isLoggedInContext._currentValue.isLoggedIn ? (
            <div>
              <Button onClick={goFavorites} color="inherit">
                Favorites
              </Button>
              <Button onClick={goLogout} color="inherit">
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={goLogin} color="inherit">
                Login
              </Button>
              <Button onClick={goSignup} color="inherit">
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
