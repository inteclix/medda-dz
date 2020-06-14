import React from "react";
import { Link as LinkRouter, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Link,
  AppBar,
  Hidden,
  CssBaseline,
  Button,
  MenuList,
  MenuItem,
  ListItemIcon,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Popover,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSnackbar } from "notistack";

import Navigator from "containers/dashboard/Navigator";
import Copyright from "containers/Copyright";

import DashboardRoutes from "routes/DashboardRoutes";

import { useAppStore } from "stores";

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {},
  footer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    background: "#eaeff1",
  },
}));

export default (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, setToken } = useAppStore();
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if(location.pathname !=="/me" && (!user.email || !user?.doctor?.clinic?.mobile)){
    history.replace("/me")
    enqueueSnackbar("Completé votre informations pour continue utilse medda", {
      variant: "success",
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <Link className={classes.link} href="#" variant="body2">
                  Go to docs
                </Link>
              </Grid>
              <Grid item>
                <Tooltip title="Aucun notification">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  className={classes.iconButtonAvatar}
                  onClick={handleProfileClick}
                >
                  <Avatar alt={user.username.toUpperCase()} />
                </IconButton>
                <Popover
                  anchorEl={profileAnchorEl}
                  keepMounted
                  open={Boolean(profileAnchorEl)}
                  onClose={handleProfileClose}
                  autoFocus={false}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <MenuList>
                    <MenuItem component={LinkRouter} to="/me">
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Mon Compte</Typography>
                    </MenuItem>
                    <MenuItem component={LinkRouter} to="/settings">
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Parameters</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setToken("");
                      }}
                    >
                      <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit" noWrap>
                        Déconnecté
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Popover>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DashboardRoutes />
        <footer className={classes.footer}>
          <Copyright />
        </footer>
      </div>
    </div>
  );
};
