import { useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { Values } from "../types/LocalTypes";

const SignIn = () => {
  const { handleLogin } = useUserContext();
  const values: Values = {
    username: "",
    password: "",
  };
  const doLogin = async () => {
    try {
      handleLogin(inputs as Values);
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(doLogin, values);

  return (
    <div id="login-form" className="col text-center">
      <p>Sign in if you already have an account</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginusername">Username</label>
          <input type="text" id="loginusername" name="username" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="loginpassword">Password</label>
          <input type="password" id="loginpassword" name="password" autoComplete="current-password" onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
