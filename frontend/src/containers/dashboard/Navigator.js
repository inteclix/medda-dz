import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from '@material-ui/icons/Person';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Link as RouterLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

function Navigator(props) {
  const classes = useStyles();
  const location = useLocation();
  const categories = [
    {
      id: "Gestions",
      children: [
        {
          id: "Accueil",
          icon: <HomeIcon />,
          to: "/",
          active: location.pathname === "/",
        },
        {
          id: "Patients",
          icon: <PeopleIcon />,
          active: location.pathname.startsWith("/patients"),
          to: "/patients",
        },
        {
          id: "Rendez-vous",
          icon: <AccessTimeIcon />,
          active: location.pathname.startsWith("/appointments"),
          to: "/appointments",
        },
      ],
    },
    {
      id: "Autres",
      children: [
        {
          id: "Mon compte",
          icon: <PersonIcon />,
          to: "/me",
          active: location.pathname.startsWith("/me"),
        },
        {
          id: "Sous comptes",
          icon: <SupervisedUserCircleIcon />,
          to: "/accounts",
          active: location.pathname.startsWith("/accounts"),
        },
        {
          id: "Parametres",
          icon: <SettingsIcon />,
          to: "/settings",
          active: location.pathname.startsWith("/settings"),
        },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          {""}
        </ListItem>

        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, to }) => (
              <ListItem
                key={childId}
                button
                component={RouterLink}
                to={to}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigator;
