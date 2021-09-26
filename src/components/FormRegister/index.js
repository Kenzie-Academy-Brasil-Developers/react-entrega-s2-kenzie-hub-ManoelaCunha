import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import { useStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  PersonOutlined,
  EmailOutlined,
  LibraryBooksOutlined,
  ContactSupportOutlined,
  CollectionsBookmarkOutlined,
} from "@material-ui/icons";

import { Redirect, useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
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

const FormRegister = ({ authenticated, userId }) => {
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
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches("^([a-zA-Zà-úÀ-Ú]|\\s+)+$", "Somente Letras"),
    bio: yup.string().required("Bio obrigatório"),
    contact: yup.string().required("Número obrigatório"),
    course_module: yup.string().required("Módulo do curso obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    formSchema.isValid(data).then((valid) => {
      valid &&
        axios
          .post("https://kenziehub.herokuapp.com/users", data)
          .then((response) => {
            history.push("/");
          })
          .catch((err) => console.log(err.response.data));
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        CADASTRO
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
            <TextField
              type="text"
              size="small"
              label="Nome"
              margin="normal"
              variant="standard"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              className={classes.textfield}
              InputProps={{
                endAdornment: <PersonOutlined className={classes.icone} />,
              }}
            />
          </div>
          <div>
            <TextField
              type="text"
              size="small"
              label="Biografia"
              margin="normal"
              variant="standard"
              {...register("bio")}
              error={!!errors.bio}
              helperText={errors.bio?.message}
              className={classes.textfield}
              InputProps={{
                endAdornment: (
                  <LibraryBooksOutlined className={classes.icone} />
                ),
              }}
            />
          </div>
          <div>
            <TextField
              type="tel"
              size="small"
              label="Contato"
              margin="normal"
              variant="standard"
              {...register("contact")}
              error={!!errors.contact}
              helperText={errors.contact?.message}
              className={classes.textfield}
              InputProps={{
                endAdornment: (
                  <ContactSupportOutlined className={classes.icone} />
                ),
              }}
            />
          </div>
          <div>
            <TextField
              type="text"
              size="small"
              label="Módulo do Curso"
              margin="normal"
              variant="standard"
              {...register("course_module")}
              error={!!errors.course_module}
              helperText={errors.course_module?.message}
              className={classes.textfield}
              InputProps={{
                endAdornment: (
                  <CollectionsBookmarkOutlined className={classes.icone} />
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
              Cadastrar
            </Button>
          </div>
        </form>
        {authenticated && <Redirect to={`/home/${userId}`} />}
      </Paper>
      <div>
        <Typography variant="h5" className={classes.subTitle}>
          {" "}
          Já tem uma conta? Faça <Link to="/">Login</Link>!
        </Typography>
      </div>
    </div>
  );
};

export default FormRegister;
