import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  boxUser: {
    width: 320,
    margin: "28px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  boxForm: {
    height: "65px",
  },
  card: {
    width: 310,
    margin: "0px auto",
    marginBottom: "30px",
    "@media (min-width:780px)": {
      width: 350,
    },
  },
  icone: {
    fontSize: "20px",
    cursor: "pointer",
    color: "rgb(40,40,190)",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "100%",
    backgroundColor: "white",
    border: "2px solid darkcyan",
    boxShadow: "inset 0 0 0.1em gray",
  },
}));
