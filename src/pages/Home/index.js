import img from "./undraw_to_the_stars.svg";
import avatar from "./avatar-outline.gif";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import { useStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";

import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router";

export const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
  },
  box: {
    height: "65px",
  },
  card: {
    width: 310,
    margin: "0px auto",
    ["@media (min-width:780px)"]: {
      width: 350,
    },
  },
  list: {
    fontSize: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    margin: "20px",
    fontSize: "36px",
  },
  subTitle: {
    fontSize: "28px",
  },
  textfield: {
    margin: "5px",
    minWidth: 100,
  },
  button: {
    margin: "5px",
    fontSize: "15px",
  },
  icone: {
    fontSize: "20px",
    cursor: "pointer",
    color: "rgb(40,40,190)",
  },
  avatar: {
    borderRadius: "100%",
    width: 100,
    height: 100,
    backgroundColor: "white",
  },
  boxUser: {
    width: 310,
    margin: "20px auto",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

const Home = ({ authenticated, setAuthenticated, setUserId }) => {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();

  const [name, setName] = useState("");
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState([]);

  const formSchema = yup.object().shape({
    title: yup.string().required("Nome da Tecnologia obrigatório"),
    status: yup.string().required("Nível obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const [token] = useState(
    JSON.parse(window.localStorage.getItem("@KenzieHub:token")) || ""
  );

  const loadUser = () => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${params.id}`)
      .then((response) => {
        setTechs(response.data.techs);
        setName(response.data.name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUser();
    setUserId(params.id);
  }, [newTech]);

  const handleAddTech = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNewTech([...newTech, response.data]);
      })
      .catch((err) => console.log(err.response));
  };

  const handleReset = (id) => {
    const resetTech = newTech.filter((item) => item.id !== id);

    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNewTech(resetTech);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.boxUser}>
        <img className={classes.avatar} src={avatar} alt="Avatar" />

        <div>
          <Typography variant="h4" className={classes.subTitle}>
            {name}
          </Typography>

          <Button
            size="small"
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => {
              window.localStorage.clear();
              setAuthenticated(false);
              history.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <Typography variant="h3" className={classes.title}>
        TECNOLOGIAS
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(handleAddTech)}>
        <div className={classes.box}>
          <TextField
            type="text"
            size="small"
            label="Tecnologia"
            /*margin="normal"*/
            variant="outlined"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            className={classes.textfield}
          />
        </div>
        <div className={classes.box}>
          <TextField
            type="text"
            size="small"
            label="Nível"
            /*margin="normal"*/
            variant="outlined"
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
            className={classes.textfield}
          />
        </div>
        <div className={classes.box}>
          <Button
            type="submit"
            size="medium"
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Cadastrar
          </Button>
        </div>
      </form>

      <img src={img} alt="astronauta" width="300" height="300" />

      <div>
        <Paper className={classes.card}>
          <List>
            {techs.map((item) => (
              <ListItem key={item.id} className={classes.list}>
                {`${item.title} - ${item.status}`}
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleReset(item.id)}
                >
                  Excluir
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
      {!authenticated && <Redirect to="/" />}
    </div>
  );
};

export default Home;
