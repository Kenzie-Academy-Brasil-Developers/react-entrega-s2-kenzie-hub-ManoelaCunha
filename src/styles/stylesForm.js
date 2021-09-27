import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
  box: {
    margin: "10px",
    marginTop: "50px",
    backgroundColor: "white",
    animation: `$animationForm 1500ms ${theme.transitions.easing.easeInOut}`,
  },
  title: {
    width: "100%",
    color: "white",
    fontSize: "30px",
    padding: "10px 0px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    backgroundColor: "rgb(40,40,190)",
  },
  subTitle: {
    margin: "20px",
    fontSize: "18px",
  },
  link: {
    color: "rgb(40,40,190)",
    textDecorationLine: "none",
  },
  textfield: {
    margin: "10px 20px",
    minWidth: 250,
    "@media (min-width:780px)": {
      width: 290,
      margin: "10px 20px",
    },
  },
  button: {
    margin: "20px 0px",
  },
  icone: {
    fontSize: "20px",
    cursor: "pointer",
    color: "rgb(40,40,190)",
  },
  "@keyframes animationForm": {
    from: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
}));
