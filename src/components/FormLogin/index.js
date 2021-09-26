import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import { useStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
} from "@material-ui/icons";

import { Redirect, useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
    textDecoration: 0,
  },
  box: {
    margin: "0px 20px",
    padding: "20px",
    backgroundColor: "white",
  },
  title: {
    margin: "20px",
    fontSize: "36px",
  },
  subTitle: {
    margin: "20px",
    fontSize: "20px",
  },
  textfield: {
    minWidth: 250,
    ["@media (min-width:780px)"]: {
      width: 320,
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
}));

const FormLogin = ({ authenticated, setAuthenticated, userId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Informe um Email válido"),
    password: yup
      .string()
      .required("Senha obrigatório")
      .min(8, "Mínimo 8 caracteres")
      .matches(
        "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$*&@#])[0-9a-zA-Z!$*&@#]{4,}$",
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caracter especial (!$*&@#) e um número!"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        window.localStorage.clear();
        window.localStorage.setItem(
          "@KenzieHub:token",
          JSON.stringify(response.data.token)
        );
        setAuthenticated(true);
        history.push(`/home/${response.data.user.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        LOGIN
      </Typography>
      <Paper elevation={3} className={classes.box}>
        <form onSubmit={handleSubmit(handleForm)}>
          <div>
            <TextField
              type="email"
              size="small"
              label="Email"
              margin="normal"
              variant="standard"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              className={classes.textfield}
              InputProps={{
                endAdornment: <EmailOutlined className={classes.icone} />,
              }}
            />
          </div>
          <div>
            <TextField
              type={!showPassword ? "password" : "text"}
              size="small"
              label="Senha"
              margin="normal"
              variant="standard"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              className={classes.textfield}
              InputProps={{
                endAdornment: showPassword ? (
                  <VisibilityOffOutlined
                    className={classes.icone}
                    onClick={handleShowPassword}
                  />
                ) : (
                  <VisibilityOutlined
                    className={classes.icone}
                    onClick={handleShowPassword}
                  />
                ),
              }}
            />
          </div>
          <div>
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              Entrar
            </Button>
          </div>
        </form>
      </Paper>
      <div>
        <Typography variant="h5" className={classes.subTitle}>
          Não tem uma conta? Faça o <Link to="/register">Cadastro</Link>!
        </Typography>
      </div>
      {authenticated && <Redirect to={`/home/${userId}`} />}
    </div>
  );
};

export default FormLogin;
