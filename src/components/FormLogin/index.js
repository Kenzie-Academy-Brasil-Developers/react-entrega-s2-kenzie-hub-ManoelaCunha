import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import { useStyles } from "./styles";
import { Button, TextField } from "@material-ui/core";
//import { Visibility, VisibilityOff, Person, Email } from "@material-ui/icons";

import { Redirect, useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";

const FormLogin = ({ authenticated, setAuthenticated, userId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  //const classes = useStyles();

  /*const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };*/

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

  /*if (authenticated) {
    return <Redirect to={`/home/${userId}`} />;
  }*/

  return (
    <div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            type="email"
            size="small"
            label="Email"
            margin="normal"
            variant="filled"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            //className={classes.textfield}
            /*InputProps={{
            endAdornment: <Email className={classes.icone} />,
          }}*/
          />
        </div>
        <div>
          <TextField
            type={!showPassword ? "password" : "text"}
            size="small"
            label="Senha"
            margin="normal"
            variant="filled"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            //className={classes.textfield}
            /*InputProps={{
            endAdornment: showPassword ? (
              <VisibilityOff
                className={classes.icone}
                onClick={handleShowPassword}
              />
            ) : (
              <Visibility
                className={classes.icone}
                onClick={handleShowPassword}
              />
            ),
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
            Entrar
          </Button>
        </div>
      </form>
      {authenticated && <Redirect to={`/home/${userId}`} />}
    </div>
  );
};

export default FormLogin;
