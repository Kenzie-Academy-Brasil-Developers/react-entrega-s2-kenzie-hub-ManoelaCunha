import FormRegister from "../../components/FormRegister";

const Register = ({ authenticated, userId }) => {
  return (
    <div>
      <FormRegister userId={userId} authenticated={authenticated} />
    </div>
  );
};

export default Register;
