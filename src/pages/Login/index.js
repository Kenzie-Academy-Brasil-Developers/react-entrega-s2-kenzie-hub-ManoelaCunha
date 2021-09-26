import FormLogin from "../../components/FormLogin";

const Login = ({ authenticated, setAuthenticated, userId }) => {
  return (
    <div>
      <FormLogin
        userId={userId}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </div>
  );
};

export default Login;
