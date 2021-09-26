import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import { useStyles } from "./styles";
import { Button, TextField } from "@material-ui/core";
//import { Visibility, VisibilityOff, Person, Email } from "@material-ui/icons";

import axios from "axios";
import { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router";

const Home = ({ authenticated, setAuthenticated, setUserId }) => {
  const history = useHistory();
  const params = useParams();

  const [name, setName] = useState("");
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState([]);
  console.log(newTech);

  const formSchema = yup.object().shape({
    title: yup.string().required("Bio obrigatório"),
    status: yup.string().required("Número obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token")) || ""
  );

  const loadUser = () => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${params.id}`)
      .then((response) => {
        console.log(response);
        setTechs(response.data.techs);
        setName(response.data.name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUser();
    setUserId(params.id);
  }, [newTech]);

  const handleNewTech = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
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

  /*if (!authenticated) {
    return <Redirect to="/" />;
  }*/

  return (
    <div>
      <h1>Perfil Usuário</h1>
      <p>{name}</p>

      <form onSubmit={handleSubmit(handleNewTech)}>
        <div>
          <TextField
            type="text"
            size="small"
            label="Nome da Tecnologia"
            margin="normal"
            variant="filled"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            //className={classes.textfield}
            /*InputProps={{
            endAdornment: <Person className={classes.icone} />,
            }}*/
          />
        </div>
        <div>
          <TextField
            type="text"
            size="small"
            label="Nível"
            margin="normal"
            variant="filled"
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
            //className={classes.textfield}
            /*InputProps={{
            endAdornment: <Person className={classes.icone} />,
            }}*/
          />
        </div>
        <div>
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="outlined"
            //className={classes.button}
          >
            Cadastrar
          </Button>
        </div>
      </form>
      <div>
        <ul>
          {techs.map((item) => (
            <li key={item.id}>
              {item.title} {item.status}{" "}
              <button onClick={() => handleReset(item.id)}>excluir</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          onClick={() => {
            window.localStorage.clear();
            setAuthenticated(false);
            history.push("/");
          }}
        >
          Sair
        </Button>
      </div>
      {!authenticated && <Redirect to="/" />}
    </div>
  );
};

export default Home;
