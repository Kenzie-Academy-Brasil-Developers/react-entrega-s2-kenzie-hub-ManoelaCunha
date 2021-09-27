import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useStyles } from "../../styles/stylesForm";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
} from "@material-ui/icons";

import { Redirect, useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

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

  const handleFormLogin = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        window.localStorage.clear();
        window.localStorage.setItem(
          "@KenzieHub:token",
          JSON.stringify(response.data.token)
        );
        setAuthenticated(true);
        toast.success("Sucesso ao fazer Login!");
        return history.push(`/home/${response.data.user.id}`);
      })
      .catch((_) => {
        toast.error("Erro ao fazer Login, Email ou Senha incorretos!");
      });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h3" className={classes.title}>
          LOGIN
        </Typography>
        <form onSubmit={handleSubmit(handleFormLogin)}>
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
          Não tem uma conta? Faça o{" "}
          <Link className={classes.link} to="/register">
            Cadastro
          </Link>
          !
        </Typography>
      </div>
      {authenticated && <Redirect to={`/home/${userId}`} />}
    </div>
  );
};

export default FormLogin;
