import React from "react";
import { useHistory, Link as LinkRouter } from "react-router-dom";
import { Grid, Link, Box } from "@material-ui/core";
import { motion } from "framer-motion";
import doctorsSVG from "assets/doctors.svg";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

const SVGMotion = () => (
  <motion.div
  style={{margin: 20}}
    animate={{ scale: 0.97, rotate: 0.5, opacity: 0.8 }}
    transition={{
      yoyo: Infinity,
      duration: 2,
      ease: "easeInOut",
    }}
  >
    <img style={{height: 300}} src={doctorsSVG} />
  </motion.div>
);
export default () => {
  return (
    <Grid
      container
      component={Box}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      alignItems="center"
      height="100vh"
    >
      <Grid component={Box} flex={2} item>
        <SVGMotion />
      </Grid>
      <Grid
        width={320}
        component={Box}
        flex={1}
        item
        display="flex"
        justifyContent="space-around"
      >
        <Link component={LinkRouter} to="/signin">
          Connecté
        </Link>
        <Link component={LinkRouter} to="/signup">
          S'inscrire
        </Link>
      </Grid>
    </Grid>
  );
};
