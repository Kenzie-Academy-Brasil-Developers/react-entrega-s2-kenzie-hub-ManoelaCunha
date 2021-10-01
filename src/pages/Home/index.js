import img from "../../assets/undraw_to_the_stars.svg";
import avatar from "../../assets/avatar-outline.gif";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useStyles } from "../../styles/stylesHome";
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

import { toast } from "react-toastify";

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
    reset,
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
      });
  };

  useEffect(() => {
    loadUser();
    setUserId(params.id);
  }, [params.id, newTech]);

  const handleAddTech = (data) => {
    const addTech = axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Tecnologia adicionada!");
        setNewTech([...newTech, response.data]);
      })
      .catch((_) => {
        toast.error("Tecnologia já foi adicionada!");
      });
    reset(addTech);
  };

  const handleReset = (id) => {
    const resetTech = newTech.filter((item) => item.id !== id);
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        setNewTech(resetTech);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div>
          <div className={classes.boxUser}>
            <div>
              <img className={classes.avatar} src={avatar} alt="Avatar" />
            </div>

            <div>
              <Typography variant="h4" style={{ fontSize: "26px" }}>
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

          <Typography variant="h4" style={{ color: "darkcyan" }}>
            TECNOLOGIAS
          </Typography>
        </div>

        <div>
          <img src={img} alt="foguete" width="300" height="300" />
        </div>
      </div>

      <form className={classes.box} onSubmit={handleSubmit(handleAddTech)}>
        <div className={classes.boxForm}>
          <TextField
            type="text"
            size="small"
            label="Tecnologia"
            variant="outlined"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            style={{ margin: "5px" }}
          />
        </div>
        <div className={classes.boxForm}>
          <TextField
            type="text"
            size="small"
            label="Nível"
            variant="outlined"
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
            style={{ margin: "5px" }}
          />
        </div>
        <div className={classes.boxForm}>
          <Button
            type="submit"
            size="medium"
            color="primary"
            variant="contained"
            style={{ margin: "5px", fontSize: "15px" }}
          >
            Cadastrar
          </Button>
        </div>
      </form>

      <div>
        <Paper className={classes.card}>
          <List style={{ margin: 0, padding: 0 }}>
            {techs.map((item) => (
              <ListItem
                key={item.id}
                style={{
                  padding: "8px",
                  fontSize: "22px",
                  wordBreak: "break-word",
                  justifyContent: "space-between",
                }}
              >
                {`${item.title} - ${item.status}`}
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  style={{ fontSize: "10px" }}
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
