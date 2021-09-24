import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//import { useStyles } from "./styles";
import { Button, TextField } from "@material-ui/core";
//import { Visibility, VisibilityOff, Person, Email } from "@material-ui/icons";

import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";

const FormRegister = () => {
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
            console.log(response);
            history.push("/");
          })
          .catch((err) => console.log(err.response.data));
    });
  };

  return (
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
        <TextField
          type="text"
          size="small"
          label="Nome"
          margin="normal"
          variant="filled"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
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
          label="Biografia"
          margin="normal"
          variant="filled"
          {...register("bio")}
          error={!!errors.bio}
          helperText={errors.bio?.message}
          //className={classes.textfield}
          /*InputProps={{
            endAdornment: <Person className={classes.icone} />,
          }}*/
        />
      </div>
      <div>
        <TextField
          type="tel"
          size="small"
          label="Contato"
          margin="normal"
          variant="filled"
          {...register("contact")}
          error={!!errors.contact}
          helperText={errors.contact?.message}
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
          label="Módulo do Curso"
          margin="normal"
          variant="filled"
          {...register("course_module")}
          error={!!errors.course_module}
          helperText={errors.course_module?.message}
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
  );
};

export default FormRegister;
