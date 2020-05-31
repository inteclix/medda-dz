import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  makeStyles,
} from "@material-ui/core";

const CardImage = ({ title, text, image }) => (
  <Grid item spacing={1} xs={12} sm={6} md={4}>
    <Card>
      <CardActionArea>
        <CardMedia style={{ height: 240 }} component="img" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

const cardsData = [
  {
    title: "Facile",
    text:
      "Avec son interface intuitive, vous trouverez facile à utiliser Medda. Tout est conçu pour vous offrir des données et des actions rapidement accessibles.",
    image: require("assets/undraw_interface.png"),
  },
  {
    title: "Dossier médical",
    text:
      "Gérez et organisez facilement les dossiers médicaux de vos patients, dans une seule base de données. Facile à mettre à jour en quelques clics.",
    image: require("assets/undraw_medical_research.png"),
  },
  {
    title: "Visite médicale",
    text:
      "Avec une interface intuitive, saisissez tous les détails des visites médicales de vos patients. Et en consulter l’historique en quelques clics seulement.",
    image: require("assets/undraw_doctor_visit.png"),
  },
  {
    title: "Prescription",
    text:
      "Avec un dictionnaire médical riche et extensible, et l'aide des ordonnances types, saisissez et imprimez rapidement vos ordonnances.",
    image: require("assets/undraw_to_do_list.png"),
  },
  {
    title: "Analyses médicales",
    text:
      "Demandez des analyses médicales, et en recevoir le résultat avec les paramètres anormaux mis en évidence pour attirer l’attention.",
    image: require("assets/undraw_detailed_analysis.png"),
  },
  {
    title: "Documents",
    text:
      "Sauvegardez tout type de documents avec la fiche patient; Images, documents textes ou même des vidéos. Tous à un clic pour les consulter.",
    image: require("assets/undraw_resume_folder.png"),
  },
  {
    title: "Rendez-vous",
    text: "Gestion des rendez-vous des patients.",
    image: require("assets/undraw_resume_folder.png"),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  header: {
    padding: theme.spacing(4),
    // background: "linear-gradient(to bottom, #e6e8f9 0%, #f4f6f8)",
    backgroundColor: "white",
    boxShadow: "5px 0px 25px 0px #0000007d",
    marginBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    backgroundImage: ``,
    backgroundRepeat: "no-repeat",
  },
  footer: {
    height: 320,
    padding: theme.spacing(4),
    background: "linear-gradient(to top, #e6e8f9 0%, #f4f6f8)",
    boxShadow: "5px 0px 25px 0px #0000007d",
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header} xs={12}>
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <img src={require("assets/header_left.png")} />
          <img src={require("assets/header_right.png")} />
        </Box>
        <Box marginTop={4} marginBottom={1}>
          <Typography variant="h4">
            Logiciel de gestion de cabinet médical et clinique online
          </Typography>
          <Typography>
            Gagnez du temps, réduisez l'erreur et assurez une meilleure qualité
            de service.
          </Typography>
        </Box>
        <Box marginTop={4} marginBottom={1}>
          <Button
            component={LinkRouter}
            to="/signin"
            style={{ marginRight: 16 }}
            variant="contained"
            color="primary"
          >
            Connecté
          </Button>
          <Button
            component={LinkRouter}
            to="/signup"
            variant="outlined"
            color="primary"
          >
            créer un compte
          </Button>
        </Box>
      </Box>

      <Container>
        <Box margin={2} marginBottom={4}>
          <Typography variant="h5">
            Avec <span style={{ fontWeight: 700 }}>MEDDA</span>, vous êtes
            présent pour vos patients lorsqu’ils ont besoin de vous, n’importe
            quand, n’importe où en Algérie.
          </Typography>
        </Box>
        <Grid xs={12} spacing={2} container>
          {cardsData.map((cardData) => (
            <CardImage {...cardData} />
          ))}
        </Grid>
      </Container>
      <Box className={classes.footer} />
    </Box>
  );
};
